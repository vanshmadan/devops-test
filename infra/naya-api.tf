module "naya_api" {
  source = "./modules/cloudrun-service"

  name                  = "naya-api"
  region                = var.region
  image_url             = "asia-south1-docker.pkg.dev/alien-handler-412515/naya-api/naya-api:${var.api_image_tag}"
  memory                = var.memory
  cpu                   = var.cpu
  min_scale             = var.min_scale
  max_scale             = var.max_scale
  allow_unauthenticated  = true

  env_vars = {
    NODE_ENV = "production"
    MONGO_URI = var.mongo_uri
  }
}
