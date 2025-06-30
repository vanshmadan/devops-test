resource "google_cloud_run_service" "this" {
  name     = var.name
  location = var.region

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = var.min_scale
        "autoscaling.knative.dev/maxScale" = var.max_scale
        "run.googleapis.com/network-interfaces" = jsonencode([
          {
            network    = "default"
            subnetwork = "default"
          }
        ])             
        "run.googleapis.com/vpc-access-egress"  = "all-traffic"
      }
    }


    spec {
      containers {
        image =  var.image_url


        resources {
          limits = {
            memory = var.memory
            cpu    = var.cpu
          }
        }

        ports {
          container_port = var.container_port
        }

        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.key
            value = env.value
          }
        }
      }

    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "unauth_invoker" {
  count    = var.allow_unauthenticated ? 1 : 0
  service  = google_cloud_run_service.this.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
