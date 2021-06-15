package codesquad.issueTracker.controller;

import codesquad.issueTracker.Data;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.service.MilestoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/milestones")
public class MilestoneController {
    private final MilestoneService milestoneService;

    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping()
    public ResponseEntity<Data> getMilestone() {
        return ResponseEntity.ok().body(milestoneService.getMilestones());
    }

    @PostMapping()
    public ResponseEntity<String> createMilestone(@RequestBody Milestone milestone) {
        milestoneService.createMilestone(milestone);
        return ResponseEntity.ok().body("마일스톤 생성 성공!");
    }

    @PutMapping("/{milestoneId}")
    public ResponseEntity<String> updateMilestone(@PathVariable Long milestoneId, @RequestBody Milestone updateMilestone) {
        milestoneService.updateMilestone(milestoneId, updateMilestone);
        return ResponseEntity.ok().body("마일스톤 수정 성공!");
    }

    @DeleteMapping("/{milestoneId}")
    public ResponseEntity<String> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestone(milestoneId);
        return ResponseEntity.ok().body("마일스톤 삭제 성공!");
    }
}
