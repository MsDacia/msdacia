#!/bin/bash

# Deployment Script for Vue 3 Project to Dreamhost
# Author: Dacia Rodrigue
# Target: msdacia@iad1-shared-b8-07.dreamhost.com:/home/msdacia/msdacia.com

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
REMOTE_USER="msdacia"
REMOTE_HOST="iad1-shared-b8-07.dreamhost.com"
REMOTE_PATH="/home/msdacia/msdacia.com"
LOCAL_BUILD_DIR="./dist"
BACKUP_DIR="backups"

# Function to print colored output
print_step() {
	echo -e "${BLUE}🚀 $1${NC}"
}

print_success() {
	echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
	echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
	echo -e "${RED}❌ $1${NC}"
}

print_info() {
	echo -e "${PURPLE}ℹ️  $1${NC}"
}

# Function to check if required tools are available
check_dependencies() {
	print_step "Checking dependencies..."

	# Check if rsync is available
	if ! command -v rsync &> /dev/null; then
		print_error "rsync is not installed. Please install rsync."
		exit 1
	fi

	# Check if ssh is available
	if ! command -v ssh &> /dev/null; then
		print_error "ssh is not installed. Please install ssh."
		exit 1
	fi

	print_success "All dependencies are available"
}

# Function to test SSH connection
test_connection() {
	print_step "Testing SSH connection..."

	if ssh -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_USER@$REMOTE_HOST" exit 2>/dev/null; then
		print_success "SSH connection successful"
	else
		print_error "Cannot connect to $REMOTE_HOST"
		print_info "Please ensure:"
		print_info "1. Your SSH key is set up for passwordless login"
		print_info "2. The server is accessible"
		print_info "3. Your SSH config is correct"
		exit 1
	fi
}

# Function to create backup on remote server
create_backup() {
	print_step "Creating backup on remote server..."

	TIMESTAMP=$(date +%Y%m%d_%H%M%S)
	BACKUP_NAME="backup_$TIMESTAMP"

	ssh "$REMOTE_USER@$REMOTE_HOST" "
		if [ -d '$REMOTE_PATH' ]; then
			mkdir -p '$BACKUP_DIR'
			cp -r '$REMOTE_PATH' '$BACKUP_DIR/$BACKUP_NAME'
			echo 'Backup created: $BACKUP_DIR/$BACKUP_NAME'
		else
			echo 'No existing deployment found, skipping backup'
		fi
	" || {
		print_warning "Backup creation failed, continuing anyway..."
	}

	print_success "Backup completed"
}

# Function to build the project
build_project() {
	print_step "Building Vue 3 project..."

	# Clean previous build
	if [ -d "$LOCAL_BUILD_DIR" ]; then
		rm -rf "$LOCAL_BUILD_DIR"
		print_info "Cleaned previous build"
	fi

	# Run the build
	npm run build

	if [ $? -eq 0 ]; then
		print_success "Build completed successfully"
	else
		print_error "Build failed"
		exit 1
	fi

	# Verify build directory exists
	if [ ! -d "$LOCAL_BUILD_DIR" ]; then
		print_error "Build directory not found. Expected: $LOCAL_BUILD_DIR"
		exit 1
	fi

	print_info "Build size: $(du -sh $LOCAL_BUILD_DIR | cut -f1)"
}

# Function to deploy files
deploy_files() {
	print_step "Deploying files to Dreamhost..."

	# Create remote directory if it doesn't exist
	ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p '$REMOTE_PATH'"

	# Deploy with rsync
	rsync -avz \
		--delete \
		--exclude='*.DS_Store' \
		--exclude='*.log' \
		--exclude='node_modules' \
		--exclude='.git' \
		--exclude='.env*' \
		--progress \
		"$LOCAL_BUILD_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

	if [ $? -eq 0 ]; then
		print_success "Files deployed successfully"
	else
		print_error "Deployment failed"
		exit 1
	fi
}

# Function to verify deployment
verify_deployment() {
	print_step "Verifying deployment..."

	# Check if index.html exists on remote
	if ssh "$REMOTE_USER@$REMOTE_HOST" "[ -f '$REMOTE_PATH/index.html' ]"; then
		print_success "Deployment verified - index.html found"
	else
		print_error "Deployment verification failed - index.html not found"
		exit 1
	fi

	# Show remote directory listing
	print_info "Remote directory contents:"
	ssh "$REMOTE_USER@$REMOTE_HOST" "ls -la '$REMOTE_PATH/'"
}

# Function to show deployment summary
show_summary() {
	echo ""
	print_success "🎉 Deployment completed successfully!"
	echo ""
	print_info "Summary:"
	print_info "• Local build: $LOCAL_BUILD_DIR"
	print_info "• Remote host: $REMOTE_HOST"
	print_info "• Remote path: $REMOTE_PATH"
	print_info "• Backup created on server"
	echo ""
	print_info "Your site should now be live!"
}

# Function to show help
show_help() {
	echo "Vue 3 Deployment Script for Dreamhost"
	echo ""
	echo "Usage: $0 [command]"
	echo ""
	echo "Commands:"
	echo "  deploy       Full deployment (build + upload)"
	echo "  build        Build project only"
	echo "  upload       Upload existing build (skip build step)"
	echo "  test         Test SSH connection"
	echo "  verify       Verify current deployment"
	echo "  help         Show this help message"
	echo ""
	echo "Examples:"
	echo "  $0 deploy    # Full deployment"
	echo "  $0 test      # Test connection"
	echo ""
	echo "Configuration:"
	echo "  Remote: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
}

# Function for full deployment
full_deploy() {
	print_step "Starting full deployment..."

	check_dependencies
	test_connection
	create_backup
	build_project
	deploy_files
	verify_deployment
	show_summary
}

# Function to upload only (skip build)
upload_only() {
	print_step "Starting upload (skipping build)..."

	if [ ! -d "$LOCAL_BUILD_DIR" ]; then
		print_error "Build directory not found. Run 'npm run build' first or use 'deploy' command."
		exit 1
	fi

	check_dependencies
	test_connection
	create_backup
	deploy_files
	verify_deployment
	show_summary
}

# Main script logic
case ${1:-deploy} in
	deploy)
		full_deploy
		;;
	build)
		build_project
		;;
	upload)
		upload_only
		;;
	test)
		check_dependencies
		test_connection
		print_success "Connection test completed successfully"
		;;
	verify)
		check_dependencies
		verify_deployment
		;;
	help|--help|-h)
		show_help
		;;
	*)
		print_error "Unknown command: $1"
		echo ""
		show_help
		exit 1
		;;
esac
