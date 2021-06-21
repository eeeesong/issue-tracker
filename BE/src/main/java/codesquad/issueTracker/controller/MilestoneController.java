package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.service.MilestoneService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {
    private final MilestoneService milestoneService;

    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping()
    public ApiResult<List<Milestone>> getMilestone() {
        return ApiResult.success(milestoneService.getMilestones());
    }

    @PostMapping()
    public ApiResult createMilestone(@RequestBody Milestone milestone) {
        milestoneService.createMilestone(milestone);
        return ApiResult.ok();
    }

    @PutMapping("/{milestoneId}")
    public ApiResult updateMilestone(@PathVariable Long milestoneId, @RequestBody Milestone updateMilestone) {
        milestoneService.updateMilestone(milestoneId, updateMilestone);
        return ApiResult.ok();
    }

    @DeleteMapping("/{milestoneId}")
    public ApiResult deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestone(milestoneId);
        return ApiResult.ok();
    }
}
