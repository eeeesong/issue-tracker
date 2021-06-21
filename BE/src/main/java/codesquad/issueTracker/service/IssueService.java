package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.dto.IssueDetailResponse;
import codesquad.issueTracker.dto.IssueIdsRequest;
import codesquad.issueTracker.dto.IssueRequest;
import codesquad.issueTracker.repository.IssueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> findAll() {
        return issueRepository.findByDeletedFalse();
    }

    public List<Issue> findByStatusIsOpen() {
        return issueRepository.findByStatusTrue();
    }

    public List<Issue> findByStatusIsClose() {
        return issueRepository.findByStatusFalse();
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
        issue.delete();
        issueRepository.save(issue);
    }

    public IssueDetailResponse getIssueDetail(Long id) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        return null;
    }

    public void updateIssueTitle(Long id, String title) {
        Issue issue = issueRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("이슈 존재하지 않음"));
        issue.editTitle(title);
        issueRepository.save(issue);
    }


    public Issue makeIssue(IssueRequest issueRequest, User writer, Milestone milestone) {
        Issue issue = issueRequest.toIssue(writer);
        issue.addMilestone(milestone);
        return issueRepository.save(issue);
    }
}
