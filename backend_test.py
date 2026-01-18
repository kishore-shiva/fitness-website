#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class FitnessAPITester:
    def __init__(self, base_url="https://rishi-coaching.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def test_api_root(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_message = "Prem Rishi Fitness API"
                if data.get("message") == expected_message:
                    self.log_test("API Root Endpoint", True, f"Status: {response.status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("API Root Endpoint", False, f"Unexpected message: {data.get('message')}")
            else:
                self.log_test("API Root Endpoint", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "service": "weight-loss",
            "message": "This is a test message for fitness consultation."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if data.get("status") == "success" and "submission_id" in data:
                    self.log_test("Contact Form Submission", True, 
                                f"Status: {response.status_code}, Submission ID: {data.get('submission_id')}")
                    return data.get('submission_id')
                else:
                    self.log_test("Contact Form Submission", False, 
                                f"Unexpected response format: {data}")
            else:
                self.log_test("Contact Form Submission", False, 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
        
        return None

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        # Test missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "service": ""  # Empty service
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            
            if success:
                self.log_test("Contact Form Validation", True, 
                            f"Correctly rejected invalid data with status: {response.status_code}")
            else:
                self.log_test("Contact Form Validation", False, 
                            f"Expected 422, got: {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Exception: {str(e)}")

    def test_service_options(self):
        """Test that all expected service options are supported"""
        expected_services = ["weight-loss", "strength-training", "flexibility-rehab", "nutrition-coaching"]
        
        for service in expected_services:
            test_data = {
                "name": f"Test User {service}",
                "email": f"test-{service}@example.com",
                "service": service,
                "message": f"Testing {service} service option"
            }
            
            try:
                response = requests.post(
                    f"{self.api_url}/contact",
                    json=test_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                success = response.status_code == 200
                
                if success:
                    data = response.json()
                    if data.get("status") == "success":
                        self.log_test(f"Service Option: {service}", True, 
                                    f"Service '{service}' accepted successfully")
                    else:
                        self.log_test(f"Service Option: {service}", False, 
                                    f"Unexpected response: {data}")
                else:
                    self.log_test(f"Service Option: {service}", False, 
                                f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Service Option: {service}", False, f"Exception: {str(e)}")

    def test_submissions_endpoint(self):
        """Test the submissions endpoint (admin endpoint)"""
        try:
            response = requests.get(f"{self.api_url}/submissions", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Submissions Endpoint", True, 
                                f"Status: {response.status_code}, Found {len(data)} submissions")
                else:
                    self.log_test("Submissions Endpoint", False, 
                                f"Expected list, got: {type(data)}")
            else:
                self.log_test("Submissions Endpoint", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Submissions Endpoint", False, f"Exception: {str(e)}")

    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        try:
            response = requests.options(f"{self.api_url}/contact", timeout=10)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            has_cors = any(cors_headers.values())
            
            if has_cors:
                self.log_test("CORS Headers", True, f"CORS headers present: {cors_headers}")
            else:
                self.log_test("CORS Headers", False, "No CORS headers found")
                
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Prem Rishi Fitness API Tests")
        print("=" * 50)
        
        # Test API availability
        self.test_api_root()
        
        # Test contact form functionality
        self.test_contact_form_submission()
        self.test_contact_form_validation()
        
        # Test all service options
        self.test_service_options()
        
        # Test admin endpoints
        self.test_submissions_endpoint()
        
        # Test CORS
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

    def get_test_results(self):
        """Return test results for reporting"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = FitnessAPITester()
    exit_code = tester.run_all_tests()
    
    # Save results to file for reporting
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return exit_code

if __name__ == "__main__":
    sys.exit(main())