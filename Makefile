SUBMODULES = build_utils
SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

# Name of the service
SERVICE_NAME := koffing
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 0e86b4057cbf773232d9c04bb8d1cebfea78a088

BUILD_IMAGE_TAG := 55e987e74e9457191a5b4a7c5dc9e3838ae82d2b

CALL_W_CONTAINER := init build clean submodules

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init:
	npm install

build:
	npm run build

clean:
	rm -rf dist

.state: build_image
	echo $(SERVICE_IMAGE_TAG) > $@

test: .state
	docker run --rm $(SERVICE_IMAGE_NAME):$(shell cat .state) nginx -T -c /etc/nginx/nginx.conf
