package codesquad.issueTracker.service;

import codesquad.issueTracker.Data;
import codesquad.issueTracker.domain.Label;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.repository.MilestoneRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MilestoneService {
    private final MilestoneRepository milestoneRepository;

    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public Data getMilestones() {
        return Data.ok(milestoneRepository.findByDeletedIsFalse(), "mileStone");
    }

    public void createMilestone(Milestone milestone) {
        milestoneRepository.save(milestone);
    }

    @Transactional
    public Milestone updateMilestone(Long id, Milestone updateMilestone) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 마일스톤입니다"));

        milestone.updateMilestone(updateMilestone);

        return milestoneRepository.save(milestone);
    }

    @Transactional
    public void deleteMilestone(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 마일스톤입니다"));

        milestone.delete();
        milestoneRepository.save(milestone);
    }
}
