-- Job Openings Table Schema
CREATE TABLE IF NOT EXISTS job_openings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- 'Full-time', 'Part-time', 'Contract', 'Internship'
    location VARCHAR(255) DEFAULT 'St. Angeloes College, Lucknow',
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    benefits TEXT,
    salary_range VARCHAR(100),
    experience_level VARCHAR(50), -- 'Entry', 'Mid', 'Senior', 'Executive'
    education_required VARCHAR(255),
    application_deadline DATE,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false, -- For highlighting important positions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_job_openings_active ON job_openings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_openings_department ON job_openings(department);
CREATE INDEX IF NOT EXISTS idx_job_openings_job_type ON job_openings(job_type);

-- Enable Row Level Security
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active job openings
CREATE POLICY "Allow public read access to active job openings" ON job_openings
    FOR SELECT USING (is_active = true);

-- Create policy to allow admin full access (for authenticated admin users)
CREATE POLICY "Allow admin full access to job openings" ON job_openings
    FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_job_openings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_job_openings_updated_at_trigger
    BEFORE UPDATE ON job_openings
    FOR EACH ROW
    EXECUTE FUNCTION update_job_openings_updated_at();

-- Insert some sample job openings
INSERT INTO job_openings (title, department, job_type, description, requirements, responsibilities, benefits, salary_range, experience_level, education_required) VALUES
(
    'High School Math Teacher',
    'Mathematics Department',
    'Full-time',
    'We are seeking an experienced and passionate Mathematics teacher to join our high school faculty. The ideal candidate will inspire students to develop strong mathematical skills and critical thinking abilities.',
    'Bachelor''s degree in Mathematics or related field, Teaching certification, 2+ years teaching experience, Strong communication skills',
    'Develop and implement engaging lesson plans, Assess and evaluate student progress, Collaborate with colleagues on curriculum development, Maintain classroom discipline and positive learning environment',
    'Competitive salary, Health insurance, Professional development opportunities, Paid time off, Retirement benefits',
    '₹25,000 - ₹35,000 per month',
    'Mid',
    'Bachelor''s degree in Mathematics or Education'
),
(
    'Middle School Science Teacher',
    'Science Department',
    'Full-time',
    'Join our science department to inspire young minds with hands-on experiments and scientific discovery. We''re looking for an enthusiastic educator who can make science exciting and accessible.',
    'Bachelor''s degree in Science or Education, Teaching certification, Experience with laboratory equipment, Strong organizational skills',
    'Plan and conduct science experiments, Teach various science subjects (Physics, Chemistry, Biology), Maintain laboratory equipment and safety standards, Assess student understanding through practical and theoretical tests',
    'Competitive salary, Health insurance, Professional development opportunities, Laboratory equipment access, Paid time off',
    '₹22,000 - ₹32,000 per month',
    'Mid',
    'Bachelor''s degree in Science or Education'
),
(
    'Elementary School Art Instructor',
    'Arts Department',
    'Part-time',
    'Bring creativity to life in our elementary classrooms with engaging art projects and activities. We need a creative individual who can nurture artistic expression in young students.',
    'Bachelor''s degree in Fine Arts or Art Education, Teaching certification preferred, Experience working with children, Creative and patient personality',
    'Develop age-appropriate art curriculum, Teach various art techniques and mediums, Organize art exhibitions and displays, Maintain art supplies and classroom organization',
    'Flexible schedule, Competitive hourly rate, Access to art supplies, Professional development opportunities',
    '₹15,000 - ₹20,000 per month',
    'Entry',
    'Bachelor''s degree in Fine Arts or related field'
),
(
    'School Counselor',
    'Student Support Services',
    'Full-time',
    'Provide guidance and support to students, helping them navigate academic and personal challenges. We''re looking for a compassionate professional who can support student wellbeing and academic success.',
    'Master''s degree in Counseling or Psychology, Counseling license/certification, 2+ years counseling experience, Strong interpersonal and communication skills',
    'Provide individual and group counseling sessions, Develop and implement student support programs, Collaborate with teachers and parents, Maintain confidential student records',
    'Competitive salary, Health insurance, Professional development opportunities, Flexible work environment, Paid time off',
    '₹30,000 - ₹40,000 per month',
    'Senior',
    'Master''s degree in Counseling or Psychology'
),
(
    'Administrative Assistant',
    'Administration',
    'Part-time',
    'Support our administrative team with various office tasks and student services. We need an organized and efficient individual who can handle multiple responsibilities in a fast-paced environment.',
    'High school diploma or equivalent, 1+ year administrative experience, Proficiency in Microsoft Office, Strong organizational and communication skills',
    'Handle phone calls and emails, Maintain student and staff records, Assist with scheduling and event coordination, Provide general administrative support',
    'Flexible schedule, Competitive hourly rate, Professional development opportunities, Friendly work environment',
    '₹12,000 - ₹18,000 per month',
    'Entry',
    'High school diploma or equivalent'
);
