package com.dribrahim.backend.modules.profile.service;

import com.dribrahim.backend.modules.profile.domain.LocalizedAchievementList;
import com.dribrahim.backend.modules.profile.domain.LocalizedProfileEducationContent;
import com.dribrahim.backend.modules.profile.domain.LocalizedProfileText;
import com.dribrahim.backend.modules.profile.domain.ProfileEducationItem;
import com.dribrahim.backend.modules.profile.domain.ProfileEducationTranslations;
import com.dribrahim.backend.modules.profile.domain.ProfileEntity;
import com.dribrahim.backend.modules.profile.repository.ProfileRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileAdminService {

    private static final String PROFILE_ID = "doctor-profile";

    private final ProfileRepository profileRepository;

    @Transactional
    public ProfileEntity getProfile() {
        return profileRepository.findById(PROFILE_ID)
            .orElseGet(() -> profileRepository.save(createDefaultProfile()));
    }

    @Transactional
    public ProfileEntity save(ProfileEntity request) {
        ProfileEntity profile = profileRepository.findById(PROFILE_ID).orElseGet(this::createDefaultProfile);
        profile.setId(PROFILE_ID);
        profile.setBio(request.getBio());
        profile.setEducation(request.getEducation());
        profile.setAchievements(request.getAchievements());
        return profileRepository.save(profile);
    }

    private ProfileEntity createDefaultProfile() {
        return ProfileEntity.builder()
            .id(PROFILE_ID)
            .bio(LocalizedProfileText.builder()
                .az("Dr. Ibrahim Abdulla dijital stomatologiya ve kompleks estetik mualice uzre ixtisaslasmis hekimdir. Her pasiyent ucun ferdi ve texnologiya yonumlu mualice strategiyasi qurur.")
                .ru("Dr. Ibrahim Abdulla spetsializiruetsya na tsifrovoy stomatologii i kompleksnom esteticheskom lechenii. Dlya kazhdogo patsienta formiruetsya individualnaya strategiia.")
                .en("Dr. Ibrahim Abdulla specializes in digital dentistry and comprehensive aesthetic treatment. Every patient receives a tailored, technology-led care strategy.")
                .build())
            .education(List.of(ProfileEducationItem.builder()
                .year("2008")
                .locales(ProfileEducationTranslations.builder()
                    .az(LocalizedProfileEducationContent.builder()
                        .title("Baki Tibb Universiteti")
                        .description("Stomatologiya uzre baza tibbi hazirliq ve kliniki tecrube.")
                        .build())
                    .ru(LocalizedProfileEducationContent.builder()
                        .title("Bakinskiy Meditsinskiy Universitet")
                        .description("Bazovaya podgotovka po stomatologii i klinicheskaya praktika.")
                        .build())
                    .en(LocalizedProfileEducationContent.builder()
                        .title("Baku Medical University")
                        .description("Core dental training with foundational clinical practice.")
                        .build())
                    .build())
                .build()))
            .achievements(LocalizedAchievementList.builder()
                .az(new ArrayList<>(List.of("1500+ ugurlu implant", "15+ il tecrube", "98% pasiyent memnuniyyeti")))
                .ru(new ArrayList<>(List.of("1500+ uspeshnykh implantov", "15+ let opyta", "98% udovletvorennosti patsientov")))
                .en(new ArrayList<>(List.of("1500+ successful implants", "15+ years of experience", "98% patient satisfaction")))
                .build())
            .build();
    }
}
