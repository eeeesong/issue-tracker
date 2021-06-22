package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.*;
import codesquad.issueTracker.dto.request.CommentRequest;
import codesquad.issueTracker.dto.issue.request.*;
import codesquad.issueTracker.dto.issue.response.IssueDetailResponse;
import codesquad.issueTracker.dto.issue.response.IssueResponse;
import codesquad.issueTracker.repository.IssueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserService userService;
    private final LabelService labelService;
    private final MilestoneService milestoneService;
    private final CommentService commentService;

    public IssueService(IssueRepository issueRepository, UserService userService, LabelService labelService,
                        MilestoneService milestoneService, CommentService commentService) {
        this.issueRepository = issueRepository;
        this.userService = userService;
        this.labelService = labelService;
        this.milestoneService = milestoneService;
        this.commentService = commentService;
    }

    public List<IssueResponse> findAll() {
        return issueRepository.findByDeletedFalse().stream()
                .map(IssueResponse::new)
                .collect(Collectors.toList());
    }

    public List<IssueResponse> findByStatusIsOpen() {
        return issueRepository.findByStatusTrue().stream()
                .map(IssueResponse::new)
                .collect(Collectors.toList());
    }

    public List<IssueResponse> findByStatusIsClose() {
        return issueRepository.findByStatusFalse().stream()
                .map(IssueResponse::new)
                .collect(Collectors.toList());
    }

    public IssueDetailResponse getIssueDetail(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        return new IssueDetailResponse(issue, getTotalIssueCount(), getOpenIssueCount());
    }

    public Long getTotalIssueCount() {
        return issueRepository.countIssueByDeletedFalse();
    }

    public Long getOpenIssueCount() {
        return issueRepository.countIssueByStatusTrueAndDeletedFalse();
    }

    public Long getCloseIssueCount() {
        return issueRepository.countIssueByStatusFalseAndDeletedFalse();
    }

    @Transactional
    public void issuesStatusIsOpen(IssueIdsRequest issueIdsRequest) {
        List<Issue> issues = issueIdsRequest.getIssueId().stream()
                .map(issueId -> {
                    Issue issue = issueRepository.findByIdAndDeletedFalse(issueId).orElseThrow(IllegalArgumentException::new);
                    issue.open();
                    return issue;
                }).collect(Collectors.toList());
        issueRepository.saveAll(issues);
    }

    @Transactional
    public void issuesStatusIsClose(IssueIdsRequest issueIdsRequest) {
        List<Issue> issues = issueIdsRequest.getIssueId().stream()
                .map(issueId -> {
                    Issue issue = issueRepository.findByIdAndDeletedFalse(issueId).orElseThrow(IllegalArgumentException::new);
                    issue.close();
                    return issue;
                }).collect(Collectors.toList());
        issueRepository.saveAll(issues);
    }

    @Transactional
    public void issueDelete(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        issueRepository.delete(issue);
    }

    public void updateIssueTitle(Long id, IssueTitleRequest issueTitleRequest) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        issue.editTitle(issueTitleRequest.getTitle());
        issueRepository.save(issue);
    }

    public void updateIssueAssignee(Long id, IssueAssigneeIdsRequest issueAssigneeIdsRequest) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));

        List<IssueAssignee> assignees = userService.modifyIssueAssignees(issue, issueAssigneeIdsRequest);
        issue.editIssueAssignees(assignees);
        issueRepository.save(issue);
    }

    public void updateIssueHasLabel(Long id, IssueHasLabelIdsRequest issueHasLabelIdsRequest) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));

        List<IssueHasLabel> issueHasLabels = labelService.modifyIssueLabels(issue, issueHasLabelIdsRequest);
        issue.editIssueLabels(issueHasLabels);
        issueRepository.save(issue);
    }

    public void updateMilestone(Long id, IssueMilestoneRequest issueMilestoneRequest) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));

        Milestone milestone = milestoneService.getMilestone(issueMilestoneRequest.getMilestoneId());
        issue.editMilestone(milestone);
        issueRepository.save(issue);
    }

    public void deleteAssignee(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        userService.deleteIssueAssignees(issue);
        issueRepository.save(issue);
    }

    public void deleteLabel(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        labelService.deleteIssueLabels(issue);
        issueRepository.save(issue);
    }

    public void deleteMilestone(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        issue.deleteMilestone();
        issueRepository.save(issue);
    }

    public Issue makeIssue(IssueRequest issueRequest, User writer, Milestone milestone) {
        Issue issue = issueRequest.toIssue(writer);
        issue.addMilestone(milestone);
        return issueRepository.save(issue);
    }

    public void createIssue(IssueRequest issueRequest, Long userId) {
        User writer = userService.findOne(userId);
        Milestone milestone = null;
        if (issueRequest.getMilestoneId() != null) {
            milestone = milestoneService.getMilestone(issueRequest.getMilestoneId());
        }

        Issue issue = makeIssue(issueRequest, writer, milestone);
        commentService.makeComment(issueRequest, writer, issue);

        if (issueRequest.getLabelIds() != null) {
            labelService.makeIssueLabels(issue, issueRequest.getLabelIds());
        }
        if (issueRequest.getAssigneeIds() != null) {
            userService.makeIssueAssignees(issue, issueRequest.getAssigneeIds());
        }
    }

    public void createComment(Long issueId, CommentRequest commentRequest, Long userId) {
        User writer = userService.findOne(userId);

        Issue issue = issueRepository.findByIdAndDeletedFalse(issueId)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));

        commentService.makeComment(commentRequest, writer, issue);
    }
}
