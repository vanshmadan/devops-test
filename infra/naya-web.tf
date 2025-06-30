module "naya_web" {
  source = "./modules/cloudrun-service"

  name                  = "naya-web"
  region                = var.region
  image_url             = "asia-south1-docker.pkg.dev/alien-handler-412515/naya-web/naya-web:${var.web_image_tag}"
  container_port        = var.naya_web_port
  memory                = "2048Mi" 
  cpu                   = var.cpu
  min_scale             = var.min_scale
  max_scale             = var.max_scale
  allow_unauthenticated  = true

  env_vars = {
    NODE_ENV = "production"
  }
}
