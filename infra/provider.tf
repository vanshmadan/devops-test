terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "naya-tf-state-bucket"   
    prefix = "terraform/cloudrun"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
