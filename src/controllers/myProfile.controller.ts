import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  myProfileService,
  skillsService,
  experienceService,
  educationService,
  certificationsService,
  achievementsService,
  servicesService,
} from "../services/myProfile.service.js";

import type {
  CreateMyProfileInput,
  UpdateMyProfileInput,
  MyProfileIdParams,

  CreateSkillInput,
  UpdateSkillInput,
  SkillIdParams,

  CreateExperienceInput,
  UpdateExperienceInput,
  ExperienceIdParams,

  CreateEducationInput,
  UpdateEducationInput,
  EducationIdParams,

  CreateCertificationInput,
  UpdateCertificationInput,
  CertificationIdParams,

  CreateAchievementInput,
  UpdateAchievementInput,
  AchievementIdParams,

  CreateServiceInput,
  UpdateServiceInput,
  ServiceIdParams,
} from "../schemas/myProfile.schema.js";


// =================================
// MY PROFILE CONTROLLER
// =================================
export const myProfileController = {

  // =========================
  // CREATE PROFILE
  // =========================
  async createProfile(
    req: Request<{}, {}, CreateMyProfileInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cvFile = (req.files as any)?.['cv']?.[0] as Express.Multer.File | undefined;
      const profilePicFile = (req.files as any)?.['profilePic']?.[0] as Express.Multer.File | undefined;

      const profile =
        await myProfileService.createProfile(
          req.body,
          cvFile,
          profilePicFile
        );

      res.status(201).json(profile);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL SKILLS
  // =========================
  async getProfiles(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skills =
        await myProfileService.getAllProfile();

      res.status(200).json(skills);

    } catch (error) {
      next(error);
    }
  },

  // =========================
  // GET SKILL
  // =========================
  async getProfile(
    req: Request<MyProfileIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const profile =
        await myProfileService.getProfileById(
          req.params.id
        );

      res.status(200).json(profile);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE PROFILE
  // =========================
  async updateProfile(
    req: Request<
      MyProfileIdParams,
      {},
      UpdateMyProfileInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cvFile = (req.files as any)?.['cv']?.[0] as Express.Multer.File | undefined;
      const profilePicFile = (req.files as any)?.['profilePic']?.[0] as Express.Multer.File | undefined;

      const profile =
        await myProfileService.updateProfile(
          req.params.id,
          req.body,
          cvFile,
          profilePicFile
        );

      res.status(200).json(profile);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE PROFILE
  // =========================
  async deleteProfile(
    req: Request<MyProfileIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const profile =
        await myProfileService.deleteProfile(
          req.params.id
        );

      res.status(200).json(profile);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// SKILLS CONTROLLER
// =================================
export const skillsController = {

  // =========================
  // CREATE SKILL
  // =========================
  async createSkill(
    req: Request<{}, {}, CreateSkillInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const skill =
        await skillsService.createSkill(
          req.body,
          iconFile
        );

      res.status(201).json(skill);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL SKILLS
  // =========================
  async getSkills(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skills =
        await skillsService.getAllSkills();

      res.status(200).json(skills);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET SKILL
  // =========================
  async getSkill(
    req: Request<SkillIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skill =
        await skillsService.getSkillById(
          req.params.id
        );

      res.status(200).json(skill);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE SKILL
  // =========================
  async updateSkill(
    req: Request<
      SkillIdParams,
      {},
      UpdateSkillInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const skill =
        await skillsService.updateSkill(
          req.params.id,
          req.body,
          iconFile
        );

      res.status(200).json(skill);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE SKILL
  // =========================
  async deleteSkill(
    req: Request<SkillIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skill =
        await skillsService.deleteSkill(
          req.params.id
        );

      res.status(200).json(skill);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// EXPERIENCE CONTROLLER
// =================================
export const experienceController = {

  // =========================
  // CREATE EXPERIENCE
  // =========================

  async createExperience(
    req: Request<
      {},
      {},
      CreateExperienceInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const experience =
        await experienceService.createExperience(
          req.body,
          iconFile
        );

      res.status(201).json(experience);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL EXPERIENCE
  // =========================

  async getExperience(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const experience =
        await experienceService.getAllExperience();

      res.status(200).json(experience);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET EXPERIENCE
  // =========================

  async getExperienceById(
    req: Request<ExperienceIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const experience =
        await experienceService.getExperienceById(
          req.params.id
        );

      res.status(200).json(experience);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE EXPERIENCE
  // =========================

  async updateExperience(
    req: Request<
      ExperienceIdParams,
      {},
      UpdateExperienceInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const experience =
        await experienceService.updateExperience(
          req.params.id,
          req.body,
          iconFile
        );

      res.status(200).json(experience);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE EXPERIENCE
  // =========================

  async deleteExperience(
    req: Request<ExperienceIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const experience =
        await experienceService.deleteExperience(
          req.params.id
        );

      res.status(200).json(experience);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// EDUCATION CONTROLLER
// =================================
export const educationController = {

  // =========================
  // CREATE EDUCATION
  // =========================
  async createEducation(
    req: Request<
      {},
      {},
      CreateEducationInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education =
        await educationService.createEducation(
          req.body
        );

      res.status(201).json(education);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL EDUCATION
  // =========================
  async getEducation(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education =
        await educationService.getAllEducation();

      res.status(200).json(education);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET EDUCATION
  // =========================
  async getEducationById(
    req: Request<EducationIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education =
        await educationService.getEducationById(
          req.params.id
        );

      res.status(200).json(education);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE EDUCATION
  // =========================
  async updateEducation(
    req: Request<
      EducationIdParams,
      {},
      UpdateEducationInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education =
        await educationService.updateEducation(
          req.params.id,
          req.body
        );

      res.status(200).json(education);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE EDUCATION
  // =========================
  async deleteEducation(
    req: Request<EducationIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const education =
        await educationService.deleteEducation(
          req.params.id
        );

      res.status(200).json(education);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// CERTIFICATION CONTROLLER
// =================================
export const certificationsController = {

  // =========================
  // CREATE CERTIFICATION
  // =========================

  async createCertification(
    req: Request<
      {},
      {},
      CreateCertificationInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certificateFile = (req.files as any)?.['certificate']?.[0] as Express.Multer.File | undefined;
      const issuerIconFile = (req.files as any)?.['issuerIcon']?.[0] as Express.Multer.File | undefined;

      const certification =
        await certificationsService.createCertification(
          req.body,
          certificateFile,
          issuerIconFile
        );

      res.status(201).json(certification);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL CERTIFICATIONS
  // =========================

  async getCertifications(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certifications =
        await certificationsService
          .getAllCertifications();

      res.status(200).json(certifications);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET CERTIFICATION
  // =========================

  async getCertification(
    req: Request<CertificationIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certification =
        await certificationsService
          .getCertificationById(
            req.params.id
          );

      res.status(200).json(certification);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE CERTIFICATION
  // =========================

  async updateCertification(
    req: Request<
      CertificationIdParams,
      {},
      UpdateCertificationInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certificateFile = (req.files as any)?.['certificate']?.[0] as Express.Multer.File | undefined;
      const issuerIconFile = (req.files as any)?.['issuerIcon']?.[0] as Express.Multer.File | undefined;

      const certification =
        await certificationsService
          .updateCertification(
            req.params.id,
            req.body,
            certificateFile,
            issuerIconFile
          );

      res.status(200).json(certification);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE CERTIFICATION
  // =========================

  async deleteCertification(
    req: Request<CertificationIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const certification =
        await certificationsService
          .deleteCertification(
            req.params.id
          );

      res.status(200).json(certification);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// ACHIEVEMENTS CONTROLLER
// =================================
export const achievementsController = {

  // =========================
  // CREATE ACHIEVEMENT
  // =========================

  async createAchievement(
    req: Request<
      {},
      {},
      CreateAchievementInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const achievement =
        await achievementsService.createAchievement(
          req.body,
          iconFile
        );

      res.status(201).json(achievement);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL ACHIEVEMENTS
  // =========================

  async getAchievements(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const achievements =
        await achievementsService
          .getAllAchievements();

      res.status(200).json(achievements);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ACHIEVEMENT
  // =========================

  async getAchievement(
    req: Request<AchievementIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const achievement =
        await achievementsService
          .getAchievementById(
            req.params.id
          );

      res.status(200).json(achievement);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE ACHIEVEMENT
  // =========================

  async updateAchievement(
    req: Request<
      AchievementIdParams,
      {},
      UpdateAchievementInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const iconFile = req.file as Express.Multer.File | undefined;

      const achievement =
        await achievementsService
          .updateAchievement(
            req.params.id,
            req.body,
            iconFile
          );

      res.status(200).json(achievement);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE ACHIEVEMENT
  // =========================

  async deleteAchievement(
    req: Request<AchievementIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const achievement =
        await achievementsService
          .deleteAchievement(
            req.params.id
          );

      res.status(200).json(achievement);

    } catch (error) {
      next(error);
    }
  },
};


// =================================
// SERVICES CONTROLLER
// =================================
export const servicesController = {

  // =========================
  // CREATE SERVICE
  // =========================

  async createService(
    req: Request<{}, {}, CreateServiceInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const service =
        await servicesService.createService(
          req.body
        );

      res.status(201).json(service);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET ALL SERVICES
  // =========================

  async getServices(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const services =
        await servicesService.getAllServices();

      res.status(200).json(services);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // GET SERVICE
  // =========================

  async getService(
    req: Request<ServiceIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const service =
        await servicesService.getServiceById(
          req.params.id
        );

      res.status(200).json(service);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // UPDATE SERVICE
  // =========================

  async updateService(
    req: Request<
      ServiceIdParams,
      {},
      UpdateServiceInput
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const service =
        await servicesService.updateService(
          req.params.id,
          req.body
        );

      res.status(200).json(service);

    } catch (error) {
      next(error);
    }
  },


  // =========================
  // DELETE SERVICE
  // =========================

  async deleteService(
    req: Request<ServiceIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const service =
        await servicesService.deleteService(
          req.params.id
        );

      res.status(200).json(service);

    } catch (error) {
      next(error);
    }
  },
};