CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(255) NOT NULL,

    problem TEXT,
    solution TEXT,
    
    full_description TEXT, 

    github_url TEXT,
    live_demo_url TEXT,
    demo_video_url TEXT,
    project_category VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'completed'
        CHECK (status IN ('in_progress', 'completed', 'archived')),

    tech_stack TEXT[] NOT NULL DEFAULT '{}',

    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL
        REFERENCES projects(id)
        ON DELETE CASCADE,

    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_featured
ON projects (is_featured);

CREATE INDEX idx_project_images_project_id
ON project_images (project_id);