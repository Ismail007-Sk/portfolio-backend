import {
  myProfileRepository,
  skills,
  experience,
  education,
  certifications,
  achievements,
  services,
} from "../repositories/myProfile.repository.js";

import { NotFoundError } from "../errors/NotFoundError.js";

import {
  saveUploadedFile,
  deleteUploadedFile,
} from "../middleware/upload.middleware.js";

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
// MY PROFILE SERVICE
// =================================
export const myProfileService = {

  // =========================
  // CREATE PROFILE
  // =========================
  async createProfile(
    data: CreateMyProfileInput,
    cvFile?: Express.Multer.File,
    profilePicFile?: Express.Multer.File
  ) {
    let cvUrl: string | undefined;
    let profilePicUrl: string | undefined;

    try {
      // =========================
      // UPLOAD CV
      // =========================

      if (cvFile) {
        const uploadedFile =
          await saveUploadedFile(
            cvFile,
            "cv"
          );

        cvUrl = uploadedFile.fileUrl;
      }

      // =========================
      // UPLOAD PROFILE PICTURE
      // =========================

      if (profilePicFile) {
        const uploadedFile =
          await saveUploadedFile(
            profilePicFile,
            "profilePic"
          );

        profilePicUrl = uploadedFile.fileUrl;
      }

      // =========================
      // CREATE PROFILE
      // =========================

      return await myProfileRepository.create(
        data,
        cvUrl,
        profilePicUrl
      );

    } catch (error) {

      // =========================
      // CLEANUP FILES
      // =========================

      if (cvUrl) {
        await deleteUploadedFile(cvUrl);
      }

      if (profilePicUrl) {
        await deleteUploadedFile(profilePicUrl);
      }

      throw error;
    }
  },


  // =========================
  // GET ALL
  // =========================
  async getAllProfile() {
    return myProfileRepository.findAll();
  },


  // =========================
  // GET BY ID
  // =========================
  async getProfileById(id: string) {
    const profile =
      await myProfileRepository.findById(id);

    if (!profile) {
      throw new NotFoundError(
        "Profile not found"
      );
    }

    return profile;
  },


  // =========================
  // UPDATE PROFILE
  // =========================
  async updateProfile(
    id: string,
    data: UpdateMyProfileInput,
    cvFile?: Express.Multer.File,
    profilePicFile?: Express.Multer.File
  ) {
    const existingProfile =
      await myProfileRepository.findById(id);

    if (!existingProfile) {
      throw new NotFoundError(
        "Profile not found"
      );
    }

    let newCvUrl: string | undefined;
    let newProfilePicUrl: string | undefined;

    try {
      // =========================
      // UPLOAD NEW CV
      // =========================

      if (cvFile) {
        const uploadedFile =
          await saveUploadedFile(
            cvFile,
            "cv"
          );

        newCvUrl = uploadedFile.fileUrl;
      }

      // =========================
      // UPLOAD NEW PROFILE PICTURE
      // =========================

      if (profilePicFile) {
        const uploadedFile =
          await saveUploadedFile(
            profilePicFile,
            "profilePic"
          );

        newProfilePicUrl = uploadedFile.fileUrl;
      }

      // =========================
      // UPDATE PROFILE
      // =========================

      const profile =
        await myProfileRepository.update(
          id,
          data,
          newCvUrl,
          newProfilePicUrl
        );

      if (!profile) {
        throw new NotFoundError(
          "Profile not found"
        );
      }

      // =========================
      // DELETE OLD FILES
      // AFTER DB SUCCESS
      // =========================

      if (
        newCvUrl &&
        existingProfile.cv_url
      ) {
        await deleteUploadedFile(
          existingProfile.cv_url
        );
      }

      if (
        newProfilePicUrl &&
        existingProfile.profile_pic_url
      ) {
        await deleteUploadedFile(
          existingProfile.profile_pic_url
        );
      }

      return profile;

    } catch (error) {

      // =========================
      // CLEANUP NEW FILES
      // =========================

      if (newCvUrl) {
        await deleteUploadedFile(
          newCvUrl
        );
      }

      if (newProfilePicUrl) {
        await deleteUploadedFile(
          newProfilePicUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // DELETE PROFILE
  // =========================
  async deleteProfile(id: string) {
    const profile =
      await myProfileRepository.findById(id);

    if (!profile) {
      throw new NotFoundError(
        "Profile not found"
      );
    }

    const deletedProfile =
      await myProfileRepository.delete(id);

    if (!deletedProfile) {
      throw new NotFoundError(
        "Profile not found"
      );
    }

    // =========================
    // DELETE CV FILE
    // =========================
    if (profile.cv_url) {
      await deleteUploadedFile(
        profile.cv_url
      );
    }

    // =========================
    // DELETE PROFILE PICTURE FILE
    // =========================
    if (profile.profile_pic_url) {
      await deleteUploadedFile(
        profile.profile_pic_url
      );
    }

    return deletedProfile;
  },
};


// =================================
// SKILLS SERVICE
// =================================
export const skillsService = {

  // =========================
  // CREATE
  // =========================
  async createSkill(
    data: CreateSkillInput,
    iconFile?: Express.Multer.File
  ) {
    let iconUrl: string | undefined;

    try {
      // =========================
      // UPLOAD ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "skillIcon"
          );

        iconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // CREATE SKILL
      // =========================

      return await skills.create(
        data,
        iconUrl
      );

    } catch (error) {

      // =========================
      // CLEANUP ICON
      // =========================

      if (iconUrl) {
        await deleteUploadedFile(
          iconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // GET ALL
  // =========================
  async getAllSkills() {
    return skills.findAll();
  },


  // =========================
  // GET BY ID
  // =========================
  async getSkillById(id: string) {
    const skill =
      await skills.findById(id);

    if (!skill) {
      throw new NotFoundError(
        "Skill not found"
      );
    }

    return skill;
  },


  // =========================
  // UPDATE
  // =========================

  async updateSkill(
    id: string,
    data: UpdateSkillInput,
    iconFile?: Express.Multer.File
  ) {
    const existingSkill =
      await skills.findById(id);

    if (!existingSkill) {
      throw new NotFoundError(
        "Skill not found"
      );
    }

    let newIconUrl:
      | string
      | undefined;

    try {
      // =========================
      // UPLOAD NEW ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "skillIcon"
          );

        newIconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPDATE DATABASE
      // =========================

      const skill =
        await skills.update(
          id,
          data,
          newIconUrl
        );

      if (!skill) {
        throw new NotFoundError(
          "Skill not found"
        );
      }

      // =========================
      // DELETE OLD ICON
      // AFTER DB SUCCESS
      // =========================

      if (
        newIconUrl &&
        existingSkill.icon_url
      ) {
        await deleteUploadedFile(
          existingSkill.icon_url
        );
      }

      return skill;

    } catch (error) {

      // =========================
      // CLEANUP NEW ICON
      // =========================

      if (newIconUrl) {
        await deleteUploadedFile(
          newIconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // DELETE
  // =========================

  async deleteSkill(id: string) {
    const skill =
      await skills.findById(id);

    if (!skill) {
      throw new NotFoundError(
        "Skill not found"
      );
    }

    const deletedSkill =
      await skills.delete(id);

    if (!deletedSkill) {
      throw new NotFoundError(
        "Skill not found"
      );
    }

    // =========================
    // DELETE ICON FILE
    // =========================

    if (skill.icon_url) {
      await deleteUploadedFile(
        skill.icon_url
      );
    }

    return deletedSkill;
  },
};


// =================================
// EXPERIENCE SERVICE
// =================================
export const experienceService = {

  // =========================
  // CREATE
  // =========================

  async createExperience(
    data: CreateExperienceInput,
    iconFile?: Express.Multer.File
  ) {
    let iconUrl: string | undefined;

    try {
      // =========================
      // UPLOAD ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "experienceIcon"
          );

        iconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // CREATE EXPERIENCE
      // =========================

      return await experience.create(
        data,
        iconUrl
      );

    } catch (error) {

      // =========================
      // CLEANUP ICON
      // =========================

      if (iconUrl) {
        await deleteUploadedFile(
          iconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // GET ALL
  // =========================

  async getAllExperience() {
    return experience.findAll();
  },


  // =========================
  // GET BY ID
  // =========================

  async getExperienceById(id: string) {
    const item =
      await experience.findById(id);

    if (!item) {
      throw new NotFoundError(
        "Experience not found"
      );
    }

    return item;
  },


  // =========================
  // UPDATE
  // =========================

  async updateExperience(
    id: string,
    data: UpdateExperienceInput,
    iconFile?: Express.Multer.File
  ) {
    const existing =
      await experience.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Experience not found"
      );
    }

    let newIconUrl:
      | string
      | undefined;

    try {
      // =========================
      // UPLOAD NEW ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "experienceIcon"
          );

        newIconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPDATE DATABASE
      // =========================

      const item =
        await experience.update(
          id,
          data,
          newIconUrl
        );

      if (!item) {
        throw new NotFoundError(
          "Experience not found"
        );
      }

      // =========================
      // DELETE OLD ICON
      // AFTER DB SUCCESS
      // =========================

      if (
        newIconUrl &&
        existing.icon_url
      ) {
        await deleteUploadedFile(
          existing.icon_url
        );
      }

      return item;

    } catch (error) {

      // =========================
      // CLEANUP NEW ICON
      // =========================

      if (newIconUrl) {
        await deleteUploadedFile(
          newIconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // DELETE
  // =========================

  async deleteExperience(id: string) {
    const existing =
      await experience.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Experience not found"
      );
    }

    const deleted =
      await experience.delete(id);

    if (!deleted) {
      throw new NotFoundError(
        "Experience not found"
      );
    }

    // =========================
    // DELETE ICON FILE
    // =========================

    if (existing.icon_url) {
      await deleteUploadedFile(
        existing.icon_url
      );
    }

    return deleted;
  },
};


// =================================
// EDUCATION SERVICE
// =================================
export const educationService = {

  // =========================
  // CREATE
  // =========================

  async createEducation(
    data: CreateEducationInput
  ) {
    return education.create(data);
  },


  // =========================
  // GET ALL
  // =========================

  async getAllEducation() {
    return education.findAll();
  },


  // =========================
  // GET BY ID
  // =========================

  async getEducationById(id: string) {
    const item =
      await education.findById(id);

    if (!item) {
      throw new NotFoundError(
        "Education not found"
      );
    }

    return item;
  },


  // =========================
  // UPDATE
  // =========================
  async updateEducation(
    id: string,
    data: UpdateEducationInput
  ) {
    const existing =
      await education.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Education not found"
      );
    }

    const item =
      await education.update(
        id,
        data
      );

    if (!item) {
      throw new NotFoundError(
        "Education not found"
      );
    }

    return item;
  },


  // =========================
  // DELETE
  // =========================

  async deleteEducation(id: string) {
    const existing =
      await education.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Education not found"
      );
    }

    const deleted =
      await education.delete(id);

    if (!deleted) {
      throw new NotFoundError(
        "Education not found"
      );
    }

    return deleted;
  },
};


// =================================
// CERTIFICATION SERVICE
// =================================
export const certificationsService = {

  // =========================
  // CREATE
  // =========================

  async createCertification(
    data: CreateCertificationInput,
    certificateFile?: Express.Multer.File,
    issuerIconFile?: Express.Multer.File
  ) {
    let certificateUrl: string | undefined;
    let issuerIconUrl: string | undefined;

    try {
      // =========================
      // UPLOAD CERTIFICATE
      // =========================

      if (certificateFile) {
        const uploadedFile =
          await saveUploadedFile(
            certificateFile,
            "certification"
          );

        certificateUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPLOAD ISSUER ICON
      // =========================

      if (issuerIconFile) {
        const uploadedFile =
          await saveUploadedFile(
            issuerIconFile,
            "certificationIssuer"
          );

        issuerIconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // CREATE CERTIFICATION
      // =========================

      return await certifications.create(
        data,
        certificateUrl,
        issuerIconUrl
      );

    } catch (error) {

      // =========================
      // CLEANUP FILES
      // =========================

      if (certificateUrl) {
        await deleteUploadedFile(
          certificateUrl
        );
      }

      if (issuerIconUrl) {
        await deleteUploadedFile(
          issuerIconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // GET ALL
  // =========================

  async getAllCertifications() {
    return certifications.findAll();
  },


  // =========================
  // GET BY ID
  // =========================

  async getCertificationById(
    id: string
  ) {
    const certification =
      await certifications.findById(id);

    if (!certification) {
      throw new NotFoundError(
        "Certification not found"
      );
    }

    return certification;
  },


  // =========================
  // UPDATE
  // =========================

  async updateCertification(
    id: string,
    data: UpdateCertificationInput,
    certificateFile?: Express.Multer.File,
    issuerIconFile?: Express.Multer.File
  ) {
    const existing =
      await certifications.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Certification not found"
      );
    }

    let newCertificateUrl:
      | string
      | undefined;
    let newIssuerIconUrl:
      | string
      | undefined;

    try {
      // =========================
      // UPLOAD NEW CERTIFICATE
      // =========================

      if (certificateFile) {
        const uploadedFile =
          await saveUploadedFile(
            certificateFile,
            "certification"
          );

        newCertificateUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPLOAD NEW ISSUER ICON
      // =========================

      if (issuerIconFile) {
        const uploadedFile =
          await saveUploadedFile(
            issuerIconFile,
            "certificationIssuer"
          );

        newIssuerIconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPDATE DATABASE
      // =========================

      const certification =
        await certifications.update(
          id,
          data,
          newCertificateUrl,
          newIssuerIconUrl
        );

      if (!certification) {
        throw new NotFoundError(
          "Certification not found"
        );
      }

      // =========================
      // DELETE OLD FILES
      // AFTER DB SUCCESS
      // =========================

      if (
        newCertificateUrl &&
        existing.certificate_url
      ) {
        await deleteUploadedFile(
          existing.certificate_url
        );
      }

      if (
        newIssuerIconUrl &&
        existing.issuer_icon_url
      ) {
        await deleteUploadedFile(
          existing.issuer_icon_url
        );
      }

      return certification;

    } catch (error) {

      // =========================
      // CLEANUP NEW FILES
      // =========================

      if (newCertificateUrl) {
        await deleteUploadedFile(
          newCertificateUrl
        );
      }

      if (newIssuerIconUrl) {
        await deleteUploadedFile(
          newIssuerIconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // DELETE
  // =========================

  async deleteCertification(id: string) {
    const existing =
      await certifications.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Certification not found"
      );
    }

    const deleted =
      await certifications.delete(id);

    if (!deleted) {
      throw new NotFoundError(
        "Certification not found"
      );
    }

    // =========================
    // DELETE CERTIFICATE FILE
    // =========================

    if (existing.certificate_url) {
      await deleteUploadedFile(
        existing.certificate_url
      );
    }

    // =========================
    // DELETE ISSUER ICON FILE
    // =========================

    if (existing.issuer_icon_url) {
      await deleteUploadedFile(
        existing.issuer_icon_url
      );
    }

    return deleted;
  },
};



// =================================
// ACHIEVEMENTS SERVICE
// =================================
export const achievementsService = {

  // =========================
  // CREATE
  // =========================

  async createAchievement(
    data: CreateAchievementInput,
    iconFile?: Express.Multer.File
  ) {
    let iconUrl: string | undefined;

    try {
      // =========================
      // UPLOAD ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "achievementIcon"
          );

        iconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // CREATE ACHIEVEMENT
      // =========================

      return await achievements.create(
        data,
        iconUrl
      );

    } catch (error) {

      // =========================
      // CLEANUP ICON
      // =========================

      if (iconUrl) {
        await deleteUploadedFile(
          iconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // GET ALL
  // =========================

  async getAllAchievements() {
    return achievements.findAll();
  },


  // =========================
  // GET BY ID
  // =========================

  async getAchievementById(
    id: string
  ) {
    const achievement =
      await achievements.findById(id);

    if (!achievement) {
      throw new NotFoundError(
        "Achievement not found"
      );
    }

    return achievement;
  },


  // =========================
  // UPDATE
  // =========================

  async updateAchievement(
    id: string,
    data: UpdateAchievementInput,
    iconFile?: Express.Multer.File
  ) {
    const existing =
      await achievements.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Achievement not found"
      );
    }

    let newIconUrl:
      | string
      | undefined;

    try {
      // =========================
      // UPLOAD NEW ICON
      // =========================

      if (iconFile) {
        const uploadedFile =
          await saveUploadedFile(
            iconFile,
            "achievementIcon"
          );

        newIconUrl =
          uploadedFile.fileUrl;
      }

      // =========================
      // UPDATE DATABASE
      // =========================

      const achievement =
        await achievements.update(
          id,
          data,
          newIconUrl
        );

      if (!achievement) {
        throw new NotFoundError(
          "Achievement not found"
        );
      }

      // =========================
      // DELETE OLD ICON
      // AFTER DB SUCCESS
      // =========================

      if (
        newIconUrl &&
        existing.icon_url
      ) {
        await deleteUploadedFile(
          existing.icon_url
        );
      }

      return achievement;

    } catch (error) {

      // =========================
      // CLEANUP NEW ICON
      // =========================

      if (newIconUrl) {
        await deleteUploadedFile(
          newIconUrl
        );
      }

      throw error;
    }
  },


  // =========================
  // DELETE
  // =========================

  async deleteAchievement(id: string) {
    const existing =
      await achievements.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Achievement not found"
      );
    }

    const deleted =
      await achievements.delete(id);

    if (!deleted) {
      throw new NotFoundError(
        "Achievement not found"
      );
    }

    // =========================
    // DELETE ICON FILE
    // =========================

    if (existing.icon_url) {
      await deleteUploadedFile(
        existing.icon_url
      );
    }

    return deleted;
  },
};


// =================================
// SERVICES SERVICE
// =================================
export const servicesService = {

  // =========================
  // CREATE
  // =========================

  async createService(
    data: CreateServiceInput
  ) {
    return services.create(data);
  },


  // =========================
  // GET ALL
  // =========================

  async getAllServices() {
    return services.findAll();
  },


  // =========================
  // GET BY ID
  // =========================

  async getServiceById(id: string) {
    const service =
      await services.findById(id);

    if (!service) {
      throw new NotFoundError(
        "Service not found"
      );
    }

    return service;
  },


  // =========================
  // UPDATE
  // =========================

  async updateService(
    id: string,
    data: UpdateServiceInput
  ) {
    const existing =
      await services.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Service not found"
      );
    }

    const service =
      await services.update(
        id,
        data
      );

    if (!service) {
      throw new NotFoundError(
        "Service not found"
      );
    }

    return service;
  },


  // =========================
  // DELETE
  // =========================

  async deleteService(id: string) {
    const existing =
      await services.findById(id);

    if (!existing) {
      throw new NotFoundError(
        "Service not found"
      );
    }

    const deleted =
      await services.delete(id);

    if (!deleted) {
      throw new NotFoundError(
        "Service not found"
      );
    }

    return deleted;
  },
};