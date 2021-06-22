package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.IssueAssignee;
import codesquad.issueTracker.domain.IssueHasLabel;
import codesquad.issueTracker.dto.UserResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class DefaultIssueResponse {
    private final Long issueNumber;
    private final String title;

    @JsonProperty("created_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private final LocalDateTime createdTime;

    private final Boolean status;
    private final UserResponse author;
    private final List<UserResponse> assignees;
    private final List<IssueLabelResponse> labels;

    public DefaultIssueResponse(Issue issue) {
        issueNumber = issue.getId();
        title = issue.getTitle();
        createdTime = issue.getCreatedDate();
        status = issue.isStatus();
        author = new UserResponse(issue.getUser());
        assignees = toAssigneeResponses(issue.getIssueAssignees());
        labels = toLabelResponses(issue.getIssueLabels());
    }

    private List<UserResponse> toAssigneeResponses(List<IssueAssignee> issueAssignees) {
        return issueAssignees.stream()
                .map(IssueAssignee::getUser)
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    private List<IssueLabelResponse> toLabelResponses(List<IssueHasLabel> issueLabels) {
        return issueLabels.stream()
                .map(IssueHasLabel::getLabel)
                .map(IssueLabelResponse::new)
                .collect(Collectors.toList());
    }
}
