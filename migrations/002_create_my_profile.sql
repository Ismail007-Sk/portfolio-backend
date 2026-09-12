CREATE TYPE availability_status AS ENUM ( 
    'available_for_jobs', 
    'available_for_freelance', 
    'available_for_both', 
    'not_available' 
); 
 
CREATE TABLE my_profile ( 
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 

    name VARCHAR(255) NOT NULL, 
    headline VARCHAR(255), 

    bio TEXT, 
    about_me TEXT, 
    profile_pic_url TEXT,

    email VARCHAR(255) NOT NULL, 
    phone_number VARCHAR(50), 

    linkedin_url TEXT, 
    github_url TEXT, 
    cv_url TEXT, 

    availability_status availability_status NOT NULL DEFAULT 'available_for_both', 

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TYPE skill_category AS ENUM (
    'frontend',
    'backend',
    'database',
    'aiml',
    'others'
);
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category skill_category NOT NULL,
    icon_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    employment_type VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,

    -- New columns
    icon_url TEXT,
    work_status VARCHAR(20) CHECK (work_status IN ('remote', 'offline', 'hybrid')),
    responsibilities TEXT[] NOT NULL DEFAULT '{}',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    certificate_type VARCHAR(100),
    issuer_icon_url TEXT,
    certificate_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- e.g., 'Publication', 'Competition', 'Award'
    issuer VARCHAR(255),    -- e.g., 'IEEE', 'College Tech Fest'
    achievement_date DATE,
    description TEXT,
    achievement_url TEXT,   -- Link to paper, official announcement, or certificate
    icon_url TEXT,          -- Cloudinary URL for badge/logo if needed
    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TYPE service_title_enum AS ENUM (
    'fullstack', 
    'frontend', 
    'backend', 
    'aiml', 
    'other'
);

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title service_title_enum NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    services TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


