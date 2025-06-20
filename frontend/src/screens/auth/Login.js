import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Radio, 
  Select, 
  Upload, 
  Steps, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Divider,
  Alert,
  Checkbox
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  BankOutlined,
  FileTextOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const AuthContainer = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    
    // Client specific
    businessName: '',
    businessType: '',
    industry: '',
    yearOfEstablishment: '',
    annualTurnover: '',
    gstNumber: '',
    businessAddress: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    
    // Associate specific
    associateType: '',
    experience: '',
    qualification: '',
    previousOrganization: '',
    currentOccupation: ''
  });

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [clientForm] = Form.useForm();
  const [associateForm] = Form.useForm();

  const handleLogin = async (values) => {
    console.log('Login attempt:', values);
    // Add login logic here
  };

  const handleRegisterStep1 = async (values) => {
    setFormData({ ...formData, ...values });
    if (values.role === 'client') {
      setCurrentView('client-details');
    } else if (values.role === 'associate') {
      setCurrentView('associate-details');
    }
  };

  const handleClientRegistration = async (values) => {
    console.log('Client registration:', { ...formData, ...values });
    setCurrentView('kyc');
  };

  const handleAssociateRegistration = async (values) => {
    console.log('Associate registration:', { ...formData, ...values });
    setCurrentView('kyc');
  };

  // Login Component
  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-2xl text-blue-600" />
          </div>
          <Title level={2} className="mb-2">Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form
          form={loginForm}
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Checkbox>Remember me</Checkbox>
            <Button type="link" className="p-0">
              Forgot password?
            </Button>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Don't have an account?{' '}
              <Button 
                type="link" 
                onClick={() => setCurrentView('register')}
                className="p-0 font-medium"
              >
                Register here
              </Button>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );

  // Registration Step 1
  const RegisterFormStep1 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-2xl text-green-600" />
          </div>
          <Title level={2} className="mb-2">Create Account</Title>
          <Text type="secondary">Step 1: Basic Information</Text>
        </div>

        <Form
          form={registerForm}
          name="register"
          onFinish={handleRegisterStep1}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input 
                  placeholder="First name"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input 
                  placeholder="Last name"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Enter your phone"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Select Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Radio.Group className="w-full">
              <Radio.Button value="client" className="w-1/2 text-center">
                Client (Looking for funding)
              </Radio.Button>
              <Radio.Button value="associate" className="w-1/2 text-center">
                Associate (Business partner)
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full h-12 rounded-lg bg-green-600 hover:bg-green-700"
            >
              Next Step
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Already have an account?{' '}
              <Button 
                type="link" 
                onClick={() => setCurrentView('login')}
                className="p-0 font-medium"
              >
                Login here
              </Button>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );

  // Client Details Form
  const ClientDetailsForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BankOutlined className="text-2xl text-blue-600" />
          </div>
          <Title level={2} className="mb-2">Business Information</Title>
          <Text type="secondary">Step 2: Tell us about your business</Text>
        </div>

        <Form
          form={clientForm}
          name="client-details"
          onFinish={handleClientRegistration}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Business Name"
                name="businessName"
                rules={[{ required: true, message: 'Please input your business name!' }]}
              >
                <Input 
                  placeholder="Enter your business name"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Business Type"
                name="businessType"
                rules={[{ required: true, message: 'Please select business type!' }]}
              >
                <Select 
                  placeholder="Select business type"
                  className="rounded-lg"
                >
                  <Option value="proprietorship">Proprietorship</Option>
                  <Option value="partnership">Partnership</Option>
                  <Option value="private_limited">Private Limited</Option>
                  <Option value="public_limited">Public Limited</Option>
                  <Option value="llp">LLP</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Industry"
                name="industry"
                rules={[{ required: true, message: 'Please input your industry!' }]}
              >
                <Input 
                  placeholder="e.g., Manufacturing, IT, Retail"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Year of Establishment"
                name="yearOfEstablishment"
              >
                <Input 
                  type="number"
                  placeholder="e.g., 2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Annual Turnover (₹)"
                name="annualTurnover"
              >
                <Input 
                  type="number"
                  placeholder="Enter annual turnover"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="GST Number (Optional)"
                name="gstNumber"
              >
                <Input 
                  placeholder="Enter GST number if available"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">
            <EnvironmentOutlined className="mr-2" />
            Business Address
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Street Address"
                name={['businessAddress', 'street']}
              >
                <Input 
                  placeholder="Enter street address"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="City"
                name={['businessAddress', 'city']}
              >
                <Input 
                  placeholder="Enter city"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="State"
                name={['businessAddress', 'state']}
              >
                <Input 
                  placeholder="Enter state"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Pincode"
                name={['businessAddress', 'pincode']}
              >
                <Input 
                  placeholder="Enter pincode"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button 
                  onClick={() => setCurrentView('register')}
                  className="w-full h-12 rounded-lg"
                >
                  Back
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  Complete Registration
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );

  // Associate Details Form
  const AssociateDetailsForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrophyOutlined className="text-2xl text-amber-600" />
          </div>
          <Title level={2} className="mb-2">Professional Information</Title>
          <Text type="secondary">Step 2: Tell us about your experience</Text>
        </div>

        <Form
          form={associateForm}
          name="associate-details"
          onFinish={handleAssociateRegistration}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Associate Type"
                name="associateType"
                rules={[{ required: true, message: 'Please select associate type!' }]}
              >
                <Select 
                  placeholder="Select associate type"
                  className="rounded-lg"
                >
                  <Option value="freelancer">Freelancer</Option>
                  <Option value="dsa">DSA</Option>
                  <Option value="consultant">Consultant</Option>
                  <Option value="bank_rm">Bank RM</Option>
                  <Option value="retired_banker">Retired Banker</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Experience (Years)"
                name="experience"
              >
                <Input 
                  type="number"
                  placeholder="Years of experience"
                  min="0"
                  max="50"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Qualification"
                name="qualification"
              >
                <Input 
                  placeholder="e.g., MBA, CA, CFA"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Previous Organization"
                name="previousOrganization"
              >
                <Input 
                  placeholder="Previous company/organization"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Current Occupation"
                name="currentOccupation"
              >
                <Input 
                  placeholder="Current job/business"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message="Next Steps:"
            description={
              <ul className="mt-2 space-y-1">
                <li>• KYC verification will be required</li>
                <li>• Agreement signing process</li>
                <li>• Training and certification</li>
                <li>• Commission structure setup</li>
              </ul>
            }
            type="info"
            showIcon
            className="mb-6"
          />

          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button 
                  onClick={() => setCurrentView('register')}
                  className="w-full h-12 rounded-lg"
                >
                  Back
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full h-12 rounded-lg bg-amber-600 hover:bg-amber-700"
                >
                  Complete Registration
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );

  // KYC Upload Form
  const KYCForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileTextOutlined className="text-2xl text-purple-600" />
          </div>
          <Title level={2} className="mb-2">KYC Verification</Title>
          <Text type="secondary">Upload your documents for verification</Text>
        </div>

        <div className="space-y-6">
          <Card title="Aadhar Card" className="border-2 border-dashed border-gray-300">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Front Image">
                  <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-full rounded-lg">
                      Upload Front Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Back Image">
                  <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-full rounded-lg">
                      Upload Back Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Aadhar Number">
                  <Input 
                    placeholder="Enter Aadhar number"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="PAN Card" className="border-2 border-dashed border-gray-300">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="PAN Image">
                  <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-full rounded-lg">
                      Upload PAN Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PAN Number">
                  <Input 
                    placeholder="Enter PAN number"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Bank Details" className="border-2 border-dashed border-gray-300">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Account Number">
                  <Input 
                    placeholder="Account number"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="IFSC Code">
                  <Input 
                    placeholder="IFSC code"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Bank Name">
                  <Input 
                    placeholder="Bank name"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Branch Name">
                  <Input 
                    placeholder="Branch name"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Cancelled Cheque">
                  <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-full rounded-lg">
                      Upload Cancelled Cheque
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Alert
            message="Important Note"
            description="All documents will be verified by our team. You will receive an email confirmation once your account is approved."
            type="warning"
            showIcon
            className="mb-6"
          />

          <Row gutter={16}>
            <Col span={12}>
              <Button 
                onClick={() => setCurrentView(formData.role === 'client' ? 'client-details' : 'associate-details')}
                className="w-full h-12 rounded-lg"
              >
                Back
              </Button>
            </Col>
            <Col span={12}>
              <Button 
                type="primary"
                onClick={() => {
                  alert('Registration completed! Please check your email for verification.');
                  setCurrentView('login');
                }}
                className="w-full h-12 rounded-lg bg-purple-600 hover:bg-purple-700"
              >
                Submit KYC
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );

  // Main render logic
  switch (currentView) {
    case 'login':
      return <LoginForm />;
    case 'register':
      return <RegisterFormStep1 />;
    case 'client-details':
      return <ClientDetailsForm />;
    case 'associate-details':
      return <AssociateDetailsForm />;
    case 'kyc':
      return <KYCForm />;
    default:
      return <LoginForm />;
  }
};

export default AuthContainer;