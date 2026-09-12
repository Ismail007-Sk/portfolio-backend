import { db } from "../config/database.js";

import type {
  CreateMyProfileInput,
  UpdateMyProfileInput,
  CreateSkillInput,
  UpdateSkillInput,
  CreateExperienceInput,
  UpdateExperienceInput,
  CreateEducationInput,
  UpdateEducationInput,
  CreateCertificationInput,
  UpdateCertificationInput,
  CreateAchievementInput,
  UpdateAchievementInput,
  CreateServiceInput,
  UpdateServiceInput,
} from "../schemas/myProfile.schema.js";

// =================================
// MY PROFILE
// =================================
export const myProfileRepository = {

  // =========================
  // MY PROFILE CRUD
  // =========================

  async create(
    data: CreateMyProfileInput,
    cvUrl?: string,
    profilePicUrl?: string
  ) {
    const [profile] = await db("my_profile")
      .insert({
        name: data.name,
        headline: data.headline ?? null,
        bio: data.bio ?? null,
        about_me:
          data.aboutMe ?? null,
        email: data.email,
        phone_number:
          data.phoneNumber ?? null,
        linkedin_url:
          data.linkedinUrl ?? null,
        github_url:
          data.githubUrl ?? null,
        profile_pic_url: profilePicUrl ?? null,
        cv_url: cvUrl ?? null,
        availability_status:
          data.availabilityStatus,
      })
      .returning("*");

    return profile;
  },

  async findAll() {
    return db("my_profile")
      .select("*")
  },

  async findById(id: string) {
    const profile = await db("my_profile")
      .where({ id })
      .first();

    return profile ?? null;
  },

  async update(
    id: string,
    data: UpdateMyProfileInput,
    cvUrl?: string,
    profilePicUrl?: string
  ) {
    const updateData: Record<string, unknown> = {
      updated_at: db.fn.now(),
    };

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.headline !== undefined) {
      updateData.headline = data.headline;
    }

    if (data.bio !== undefined) {
      updateData.bio = data.bio;
    }

    if (data.aboutMe !== undefined) {
      updateData.about_me =
        data.aboutMe;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    if (data.phoneNumber !== undefined) {
      updateData.phone_number =
        data.phoneNumber;
    }

    if (data.linkedinUrl !== undefined) {
      updateData.linkedin_url =
        data.linkedinUrl;
    }

    if (data.githubUrl !== undefined) {
      updateData.github_url =
        data.githubUrl;
    }

    if (cvUrl !== undefined) {
      updateData.cv_url = cvUrl;
    }

    if (profilePicUrl !== undefined) {
      updateData.profile_pic_url = profilePicUrl;
    }

    if (data.availabilityStatus !== undefined) {
      updateData.availability_status =
        data.availabilityStatus;
    }

    const [profile] = await db("my_profile")
      .where({ id })
      .update(updateData)
      .returning("*");

    return profile ?? null;
  },

  async delete(id: string) {
    const [profile] = await db("my_profile")
      .where({ id })
      .delete()
      .returning("*");

    return profile ?? null;
  }
}


// =================================
// SKILLS
// =================================
export const skills = {

    // =========================
    // SKILLS CRUD
    // =========================

    async create(
      data: CreateSkillInput,
      iconUrl?: string
    ) {
      const [skill] = await db("skills")
        .insert({
          name: data.name,
          category: data.category,
          icon_url: iconUrl ?? null,
        })
        .returning("*");

      return skill;
    },

    async findById(id: string) {
      const skill = await db("skills")
        .where({ id })
        .first();

      return skill ?? null;
    },

    async findAll() {
      return db("skills")
        .select("*")
        .orderBy("created_at", "asc");
    },

    async update(
      id: string,
      data: UpdateSkillInput,
      iconUrl?: string
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.name !== undefined) {
        updateData.name = data.name;
      }

      if (data.category !== undefined) {
        updateData.category = data.category;
      }

      if (iconUrl !== undefined) {
        updateData.icon_url = iconUrl;
      }

      const [skill] = await db("skills")
        .where({ id })
        .update(updateData)
        .returning("*");

      return skill ?? null;
    },

    async delete(id: string) {
      const [skill] = await db("skills")
        .where({ id })
        .delete()
        .returning("*");

      return skill ?? null;
    }
}



// =================================
// EXPERIENCE
// =================================
export const  experience = {

    // =========================
    // EXPERIENCE CRUD
    // =========================

    async create(
      data: CreateExperienceInput,
      iconUrl?: string
    ) {
      const [experience] = await db("experience")
        .insert({
          company: data.company,
          role: data.role,
          employment_type:
            data.employmentType ?? null,
          start_date: data.startDate,
          end_date: data.endDate ?? null,
          is_current: data.isCurrent,
          description:
            data.description ?? null,
          technologies: data.technologies,
          display_order:
            data.displayOrder,
          icon_url: iconUrl ?? null,
          work_status: data.workStatus ?? null,
          responsibilities: data.responsibilities,
        })
        .returning("*");

      return experience;
    },

    async findById(id: string) {
      const experience = await db("experience")
        .where({ id })
        .first();

      return experience ?? null;
    },

    async findAll() {
      return db("experience")
        .select("*")
        .orderBy("display_order", "asc");
    },

    async update(
      id: string,
      data: UpdateExperienceInput,
      iconUrl?: string
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.company !== undefined) {
        updateData.company = data.company;
      }

      if (data.role !== undefined) {
        updateData.role = data.role;
      }

      if (data.employmentType !== undefined) {
        updateData.employment_type =
          data.employmentType;
      }

      if (data.startDate !== undefined) {
        updateData.start_date =
          data.startDate;
      }

      if (data.endDate !== undefined) {
        updateData.end_date =
          data.endDate;
      }

      if (data.isCurrent !== undefined) {
        updateData.is_current =
          data.isCurrent;
      }

      if (data.description !== undefined) {
        updateData.description =
          data.description;
      }

      if (data.technologies !== undefined) {
        updateData.technologies =
          data.technologies;
      }

      if (data.displayOrder !== undefined) {
        updateData.display_order =
          data.displayOrder;
      }

      if (iconUrl !== undefined) {
        updateData.icon_url = iconUrl;
      }

      if (data.workStatus !== undefined) {
        updateData.work_status = data.workStatus;
      }

      if (data.responsibilities !== undefined) {
        updateData.responsibilities = data.responsibilities;
      }

      const [experience] = await db("experience")
        .where({ id })
        .update(updateData)
        .returning("*");

      return experience ?? null;
    },

    async delete(id: string) {
      const [experience] = await db("experience")
        .where({ id })
        .delete()
        .returning("*");

      return experience ?? null;
    },
}



// =================================
// EDUCATION
// =================================
export const education = {

    // =========================
    // EDUCATION CRUD
    // =========================

    async create(
      data: CreateEducationInput
    ) {
      const [education] = await db("education")
        .insert({
          institution: data.institution,
          degree: data.degree,
          field_of_study:
            data.fieldOfStudy ?? null,
          start_date:
            data.startDate ?? null,
          end_date:
            data.endDate ?? null,
          description:
            data.description ?? null,
          display_order:
            data.displayOrder,
        })
        .returning("*");

      return education;
    },

    async findById(id: string) {
      const education = await db("education")
        .where({ id })
        .first();

      return education ?? null;
    },

    async findAll() {
      return db("education")
        .select("*")
        .orderBy("display_order", "asc");
    },

    async update(
      id: string,
      data: UpdateEducationInput
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.institution !== undefined) {
        updateData.institution =
          data.institution;
      }

      if (data.degree !== undefined) {
        updateData.degree = data.degree;
      }

      if (data.fieldOfStudy !== undefined) {
        updateData.field_of_study =
          data.fieldOfStudy;
      }

      if (data.startDate !== undefined) {
        updateData.start_date =
          data.startDate;
      }

      if (data.endDate !== undefined) {
        updateData.end_date =
          data.endDate;
      }

      if (data.description !== undefined) {
        updateData.description =
          data.description;
      }

      if (data.displayOrder !== undefined) {
        updateData.display_order =
          data.displayOrder;
      }

      const [education] = await db("education")
        .where({ id })
        .update(updateData)
        .returning("*");

      return education ?? null;
    },

    async delete(id: string) {
      const [education] = await db("education")
        .where({ id })
        .delete()
        .returning("*");

      return education ?? null;
    },
}


// =================================
// CERTIFICATIONS
// =================================
export const certifications = {

    // =========================
    // CERTIFICATIONS CRUD
    // =========================

    async create(
      data: CreateCertificationInput,
      certificateUrl?: string,
      issuerIconUrl?: string
    ) {
      const [certification] =
        await db("certifications")
          .insert({
            title: data.title,
            issuer: data.issuer,
            issue_date: data.issueDate,
            certificate_type:
              data.certificateType ?? null,
            issuer_icon_url:
              data.issuerIconUrl ?? issuerIconUrl ?? null,
            certificate_url:
              certificateUrl ?? null,
            display_order:
              data.displayOrder,
          })
          .returning("*");

      return certification;
    },

    async findById(id: string) {
      const certification =
        await db("certifications")
          .where({ id })
          .first();

      return certification ?? null;
    },

    async findAll() {
      return db("certifications")
        .select("*")
        .orderBy("display_order", "asc");
    },

    async update(
      id: string,
      data: UpdateCertificationInput,
      certificateUrl?: string,
      issuerIconUrl?: string
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.title !== undefined) {
        updateData.title = data.title;
      }

      if (data.issuer !== undefined) {
        updateData.issuer = data.issuer;
      }

      if (data.issueDate !== undefined) {
        updateData.issue_date =
          data.issueDate;
      }

      if (data.certificateType !== undefined) {
        updateData.certificate_type =
          data.certificateType;
      }

      if (data.issuerIconUrl !== undefined) {
        updateData.issuer_icon_url =
          data.issuerIconUrl;
      }

      if (data.displayOrder !== undefined) {
        updateData.display_order =
          data.displayOrder;
      }

      if (certificateUrl !== undefined) {
        updateData.certificate_url =
          certificateUrl;
      }

      if (issuerIconUrl !== undefined) {
        updateData.issuer_icon_url =
          issuerIconUrl;
      }

      const [certification] =
        await db("certifications")
          .where({ id })
          .update(updateData)
          .returning("*");

      return certification ?? null;
    },

    async delete(id: string) {
      const [certification] =
        await db("certifications")
          .where({ id })
          .delete()
          .returning("*");

      return certification ?? null;
    },
}



// =================================
// ACHIEVEMENTS
// =================================
export const achievements = {

    // =========================
    // ACHIEVEMENTS CRUD
    // =========================

    async create(
      data: CreateAchievementInput,
      iconUrl?: string
    ) {
      const [achievement] =
        await db("achievements")
          .insert({
            title: data.title,
            category: data.category ?? null,
            issuer: data.issuer ?? null,
            achievement_date:
              data.achievementDate ?? null,
            description:
              data.description ?? null,
            achievement_url:
              data.achievementUrl ?? null,
            icon_url:
              data.iconUrl ?? iconUrl ?? null,
            display_order:
              data.displayOrder,
          })
          .returning("*");

      return achievement;
    },

    async findById(id: string) {
      const achievement =
        await db("achievements")
          .where({ id })
          .first();

      return achievement ?? null;
    },

    async findAll() {
      return db("achievements")
        .select("*")
        .orderBy("display_order", "asc");
    },

    async update(
      id: string,
      data: UpdateAchievementInput,
      iconUrl?: string
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.title !== undefined) {
        updateData.title = data.title;
      }

      if (data.category !== undefined) {
        updateData.category = data.category;
      }

      if (data.issuer !== undefined) {
        updateData.issuer = data.issuer;
      }

      if (data.achievementDate !== undefined) {
        updateData.achievement_date =
          data.achievementDate;
      }

      if (data.description !== undefined) {
        updateData.description =
          data.description;
      }

      if (data.achievementUrl !== undefined) {
        updateData.achievement_url =
          data.achievementUrl;
      }

      if (data.iconUrl !== undefined) {
        updateData.icon_url = data.iconUrl;
      }

      if (data.displayOrder !== undefined) {
        updateData.display_order =
          data.displayOrder;
      }

      if (iconUrl !== undefined) {
        updateData.icon_url = iconUrl;
      }

      const [achievement] =
        await db("achievements")
          .where({ id })
          .update(updateData)
          .returning("*");

      return achievement ?? null;
    },

    async delete(id: string) {
      const [achievement] =
        await db("achievements")
          .where({ id })
          .delete()
          .returning("*");

      return achievement ?? null;
    },
}



// =================================
// SERVICES
// =================================
export const services = {

    // =========================
    // SERVICES CRUD
    // =========================

    async create(data: CreateServiceInput) {
      const [service] = await db("services")
        .insert({
          title: data.title,
          description: data.description,
          display_order:
            data.displayOrder,
          services: data.services,
        })
        .returning("*");

      return service;
    },

    async findById(id: string) {
      const service = await db("services")
        .where({ id })
        .first();

      return service ?? null;
    },

    async findAll() {
      return db("services")
        .select("*")
        .orderBy("display_order", "asc");
    },

    async update(
      id: string,
      data: UpdateServiceInput
    ) {
      const updateData: Record<string, unknown> = {
        updated_at: db.fn.now(),
      };

      if (data.title !== undefined) {
        updateData.title = data.title;
      }

      if (data.description !== undefined) {
        updateData.description =
          data.description;
      }

      if (data.displayOrder !== undefined) {
        updateData.display_order =
          data.displayOrder;
      }

      if (data.services !== undefined) {
        updateData.services = data.services;
      }

      const [service] = await db("services")
        .where({ id })
        .update(updateData)
        .returning("*");

      return service ?? null;
    },

    async delete(id: string) {
      const [service] = await db("services")
        .where({ id })
        .delete()
        .returning("*");

      return service ?? null;
    },
}
