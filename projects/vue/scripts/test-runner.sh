#!/bin/bash

# Test Runner Script for Vue 3 Project
# This script provides easy access to different testing commands

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
	echo -e "${BLUE}📋 $1${NC}"
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

# Function to check if npm packages are installed
check_dependencies() {
	print_step "Checking dependencies..."

	if [ ! -d "node_modules" ]; then
		print_warning "Node modules not found. Installing dependencies..."
		npm install
	fi

	print_success "Dependencies are ready"
}

# Function to run unit tests
run_unit_tests() {
	print_step "Running unit tests..."
	npm run test:run

	if [ $? -eq 0 ]; then
		print_success "Unit tests passed"
	else
		print_error "Unit tests failed"
		exit 1
	fi
}

# Function to run unit tests with coverage
run_coverage() {
	print_step "Running tests with coverage..."
	npm run test:coverage

	if [ $? -eq 0 ]; then
		print_success "Coverage report generated"
		print_step "Opening coverage report..."

		# Try to open coverage report in browser
		if command -v open &> /dev/null; then
			open coverage/index.html
		elif command -v xdg-open &> /dev/null; then
			xdg-open coverage/index.html
		else
			print_warning "Cannot open browser. Coverage report is at: coverage/index.html"
		fi
	else
		print_error "Coverage generation failed"
		exit 1
	fi
}

# Function to run E2E tests
run_e2e_tests() {
	print_step "Building application for E2E tests..."
	npm run build

	if [ $? -ne 0 ]; then
		print_error "Build failed"
		exit 1
	fi

	print_step "Running E2E tests..."
	npm run test:e2e

	if [ $? -eq 0 ]; then
		print_success "E2E tests passed"
	else
		print_error "E2E tests failed"
		exit 1
	fi
}

# Function to run E2E tests with UI
run_e2e_ui() {
	print_step "Building application for E2E tests..."
	npm run build

	if [ $? -ne 0 ]; then
		print_error "Build failed"
		exit 1
	fi

	print_step "Starting E2E test UI..."
	npm run test:e2e:ui
}

# Function to run all tests
run_all_tests() {
	print_step "Running complete test suite..."

	check_dependencies

	print_step "Step 1/4: Type checking..."
	npm run type-check

	if [ $? -ne 0 ]; then
		print_error "Type checking failed"
		exit 1
	fi

	print_step "Step 2/4: Unit tests..."
	run_unit_tests

	print_step "Step 3/4: Building application..."
	npm run build

	if [ $? -ne 0 ]; then
		print_error "Build failed"
		exit 1
	fi

	print_step "Step 4/4: E2E tests..."
	npm run test:e2e

	if [ $? -eq 0 ]; then
		print_success "All tests passed! 🎉"
	else
		print_error "E2E tests failed"
		exit 1
	fi
}

# Function to run tests in watch mode
run_watch() {
	print_step "Starting tests in watch mode..."
	npm run test
}

# Function to run performance tests
run_performance() {
	print_step "Running performance tests with Lighthouse..."

	# Check if lighthouse is installed
	if ! command -v lighthouse &> /dev/null; then
		print_warning "Lighthouse not found. Installing..."
		npm install -g lighthouse
	fi

	print_step "Building application..."
	npm run build

	if [ $? -ne 0 ]; then
		print_error "Build failed"
		exit 1
	fi

	print_step "Starting preview server..."
	npm run preview &
	SERVER_PID=$!

	# Wait for server to start
	sleep 5

	print_step "Running Lighthouse audit..."
	lighthouse http://localhost:4173 --output=html --output-path=./lighthouse-report.html

	# Kill the server
	kill $SERVER_PID

	print_success "Performance audit complete. Report saved as lighthouse-report.html"

	# Try to open report
	if command -v open &> /dev/null; then
		open lighthouse-report.html
	elif command -v xdg-open &> /dev/null; then
		xdg-open lighthouse-report.html
	fi
}

# Function to show usage
show_help() {
	echo "Vue 3 Test Runner"
	echo ""
	echo "Usage: $0 [command]"
	echo ""
	echo "Commands:"
	echo "  unit         Run unit tests"
	echo "  coverage     Run unit tests with coverage report"
	echo "  e2e          Run E2E tests"
	echo "  e2e-ui       Run E2E tests with Playwright UI"
	echo "  watch        Run tests in watch mode"
	echo "  all          Run all tests (unit + E2E)"
	echo "  performance  Run performance tests with Lighthouse"
	echo "  help         Show this help message"
	echo ""
	echo "Examples:"
	echo "  $0 unit"
	echo "  $0 coverage"
	echo "  $0 all"
}

# Main script logic
case ${1:-help} in
	unit)
		check_dependencies
		run_unit_tests
		;;
	coverage)
		check_dependencies
		run_coverage
		;;
	e2e)
		check_dependencies
		run_e2e_tests
		;;
	e2e-ui)
		check_dependencies
		run_e2e_ui
		;;
	watch)
		check_dependencies
		run_watch
		;;
	all)
		run_all_tests
		;;
	performance)
		check_dependencies
		run_performance
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
