variable "project_id" {}
variable "region" {}
variable "image_tag" {}
variable "naya_api_port" {
  description = "Port exposed by naya-api container"
  type        = number
  default     = 8080
}

variable "naya_web_port" {
  description = "Port exposed by naya-web container"
  type        = number
  default     = 3000
}


variable "min_scale" {
  description = "Minimum number of instances"
  type        = string
  default     = "0"
}

variable "max_scale" {
  description = "Maximum number of instances"
  type        = string
  default     = "3"
}

variable "memory" {
  description = "Memory limit"
  type        = string
  default     = "512Mi"
}

variable "cpu" {
  description = "CPU limit"
  type        = string
  default     = "1"
}

variable "api_image_tag" {
  description = "Image tag for naya-api"
  type        = string
}

variable "web_image_tag" {
  description = "Image tag for naya-web"
  type        = string
}
