package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.IssueAssignee;
import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.dto.IssueAssigneeIdsRequest;
import codesquad.issueTracker.repository.IssueAssigneeRepository;
import codesquad.issueTracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final IssueAssigneeRepository issueAssigneeRepository;

    public UserService(UserRepository userRepository, IssueAssigneeRepository issueAssigneeRepository) {
        this.userRepository = userRepository;
        this.issueAssigneeRepository = issueAssigneeRepository;
    }

    public User findOne(Long id) {
        return userRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    public List<IssueAssignee> makeIssueAssignees(Issue issue, List<Long> assigneeIds) {
        List<IssueAssignee> issueAssignees = new ArrayList<>();

        assigneeIds.forEach(assigneeId -> {
            User assignee = userRepository.findById(assigneeId).orElseThrow(NullPointerException::new);
            issueAssignees.add(new IssueAssignee(issue, assignee));
        });

        return issueAssigneeRepository.saveAll(issueAssignees);
    }

    public List<IssueAssignee> modifyIssueAssignees(Issue issue, IssueAssigneeIdsRequest issueAssigneeIdsRequest) {
        deleteIssueAssignees(issue);
        return makeIssueAssignees(issue, issueAssigneeIdsRequest.getAssigneeIds());
    }

    public void deleteIssueAssignees(Issue issue) {
        List<IssueAssignee> issueAssignees = issueAssigneeRepository.findByIssueId(issue.getId());
        issueAssigneeRepository.deleteAll(issueAssignees);
    }
}
