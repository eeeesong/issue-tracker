package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.dto.IssueIdsRequest;
import codesquad.issueTracker.dto.IssueRequest;
import codesquad.issueTracker.oauth.annotation.LoginRequired;
import codesquad.issueTracker.oauth.annotation.UserId;
import codesquad.issueTracker.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;
    private final UserService userService;
    private final LabelService labelService;
    private final MilestoneService milestoneService;
    private final CommentService commentService;

    public IssueController(IssueService issueService, UserService userService, LabelService labelService,
                           MilestoneService milestoneService, CommentService commentService) {
        this.issueService = issueService;
        this.userService = userService;
        this.labelService = labelService;
        this.milestoneService = milestoneService;
        this.commentService = commentService;
    }

    @GetMapping()
    public ApiResult<List<Issue>> getAllIssues() {
        return ApiResult.success(issueService.findAll());
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

    @DeleteMapping("/{issueId}")
    public ApiResult<String> issueDelete(@PathVariable Long issueId) {
        issueService.issueDelete(issueId);
        return ApiResult.ok();
    }

    @PutMapping("/{issueId}/title")
    public ApiResult<String> updateIssueTitle(@PathVariable Long issueId, @RequestBody String title) {
        issueService.updateIssueTitle(issueId, title);
        return ApiResult.ok();
    }

    @LoginRequired
    @PostMapping
    public ApiResult<String> createIssue(@RequestBody IssueRequest issueRequest, @UserId Long userId) {
        System.out.println(userId);
        User writer = userService.findOne(userId);

        Milestone milestone = milestoneService.getMilestone(issueRequest.getMilestoneId());
        Issue issue = issueService.makeIssue(issueRequest, writer, milestone);
        commentService.makeComment(issueRequest, writer, issue);
        labelService.makeIssueLabels(issue, issueRequest.getLabelIds());
        userService.makeIssueAssignees(issue, issueRequest.getAssigneeIds());
        return ApiResult.ok();
    }

}
