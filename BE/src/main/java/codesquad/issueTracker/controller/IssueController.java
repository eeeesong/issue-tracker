package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.dto.CommentRequest;
import codesquad.issueTracker.dto.issue.request.*;
import codesquad.issueTracker.dto.issue.response.IssueDetailResponse;
import codesquad.issueTracker.dto.issue.response.IssueResponse;
import codesquad.issueTracker.oauth.annotation.LoginRequired;
import codesquad.issueTracker.oauth.annotation.UserId;
import codesquad.issueTracker.service.IssueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping()
    public ApiResult<List<IssueResponse>> getAllIssues() {
        return ApiResult.success(issueService.findAll());
    }

    @GetMapping("/{issueId}")
    public ApiResult<IssueDetailResponse> getIssue(@PathVariable Long issueId) {
        return ApiResult.success(issueService.getIssueDetail(issueId));
    }

    @PutMapping("/close")
    public ApiResult<String> issueStatusIsClose(@RequestBody IssueIdsRequest issueIdsRequest) {
        issueService.issuesStatusIsClose(issueIdsRequest);
        return ApiResult.ok();
    }

    @PutMapping("/open")
    public ApiResult<String> issueStatusIsOpen(@RequestBody IssueIdsRequest issueIdsRequest) {
        issueService.issuesStatusIsOpen(issueIdsRequest);
        return ApiResult.ok();
    }

    @PutMapping("/{issueId}/title")
    public ApiResult<String> updateIssueTitle(@PathVariable Long issueId, @RequestBody IssueTitleRequest issueTitleRequest) {
        issueService.updateIssueTitle(issueId, issueTitleRequest);
        return ApiResult.ok();
    }

    @PutMapping("/{issueId}/assignee")
    public ApiResult<String> updateIssueAssignee(@PathVariable Long issueId,
                                                 @RequestBody IssueAssigneeIdsRequest issueAssigneeIdsRequest) {
        issueService.updateIssueAssignee(issueId, issueAssigneeIdsRequest);
        return ApiResult.ok();
    }

    @PutMapping("/{issueId}/label")
    public ApiResult<String> updateIssueLabel(@PathVariable Long issueId,
                                              @RequestBody IssueHasLabelIdsRequest issueHasLabelIdsRequest) {
        issueService.updateIssueHasLabel(issueId, issueHasLabelIdsRequest);
        return ApiResult.ok();
    }

    @PutMapping("/{issueId}/milestone")
    public ApiResult<String> updateIssueMilestone(@PathVariable Long issueId,
                                                  @RequestBody IssueMilestoneRequest issueMilestoneRequest) {
        issueService.updateMilestone(issueId, issueMilestoneRequest);
        return ApiResult.ok();
    }

    @DeleteMapping("/{issueId}")
    public ApiResult<String> issueDelete(@PathVariable Long issueId) {
        issueService.issueDelete(issueId);
        return ApiResult.ok();
    }

    @DeleteMapping("/{issueId}/assignee")
    public ApiResult<String> deleteIssueAssignee(@PathVariable Long issueId) {
        issueService.deleteAssignee(issueId);
        return ApiResult.ok();
    }

    @DeleteMapping("/{issueId}/label")
    public ApiResult<String> deleteIssueLabel(@PathVariable Long issueId) {
        issueService.deleteLabel(issueId);
        return ApiResult.ok();
    }

    @DeleteMapping("/{issueId}/milestone")
    public ApiResult<String> deleteIssueMilestone(@PathVariable Long issueId) {
        issueService.deleteMilestone(issueId);
        return ApiResult.ok();
    }

    @LoginRequired
    @PostMapping
    public ApiResult<String> createIssue(@RequestBody IssueRequest issueRequest, @UserId Long userId) {
        issueService.createIssue(issueRequest, userId);
        return ApiResult.ok();
    }

    @LoginRequired
    @PostMapping("/{issueId}")
    public ApiResult<String> createComment(@PathVariable Long issueId, @RequestBody CommentRequest commentRequest,
                                            @UserId Long userId) {
        issueService.createComment(issueId, commentRequest, userId);
        return ApiResult.ok();
    }
}
