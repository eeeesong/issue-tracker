package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.dto.DetailMilestoneResponse;
import codesquad.issueTracker.dto.MilestoneResponse;
import codesquad.issueTracker.dto.issue.response.IssueDetailMilestoneResponse;
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
    public ApiResult<List<MilestoneResponse>> getMilestone() {
        return ApiResult.success(milestoneService.getMilestones());
    }

    @GetMapping("/{milestoneId}")
    public ApiResult<DetailMilestoneResponse> getMilestone(@PathVariable Long milestoneId) {
        return ApiResult.success(milestoneService.getMilestoneDetail(milestoneId));
    }

    @PostMapping()
    public ApiResult<String> createMilestone(@RequestBody Milestone milestone) {
        milestoneService.createMilestone(milestone);
        return ApiResult.ok();
    }

    @PutMapping("/{milestoneId}")
    public ApiResult<String> updateMilestone(@PathVariable Long milestoneId, @RequestBody Milestone updateMilestone) {
        milestoneService.updateMilestone(milestoneId, updateMilestone);
        return ApiResult.ok();
    }

    @DeleteMapping("/{milestoneId}")
    public ApiResult<String> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestone(milestoneId);
        return ApiResult.ok();
    }
}
