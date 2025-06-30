variable "name" {
  description = "Cloud Run service name"
  type        = string
}

variable "region" {
  description = "Deployment region"
  type        = string
}

variable "container_port" {
  description = "Port exposed by the container"
  type        = number
  default     = 8080
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

variable "env_vars" {
  description = "Environment variables as key-value pairs"
  type        = map(string)
  default     = {}
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

variable "allow_unauthenticated" {
  description = "Allow unauthenticated invocations (true/false)"
  type        = bool
  default     = false
}

variable "image_url" {
  description = "Fully qualified container image URL"
  type        = string
}
