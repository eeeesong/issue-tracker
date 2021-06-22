package codesquad.issueTracker.dto.response;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.dto.issue.response.DefaultIssueResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class DetailMilestoneResponse {
    private final Long id;
    private final String title;
    private final String description;

    @JsonProperty("due_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private final LocalDateTime dueDate;

    private final List<DefaultIssueResponse> issueResponses;

    public DetailMilestoneResponse(Milestone milestone) {
        id = milestone.getId();
        title = milestone.getTitle();
        description = milestone.getDescription();
        dueDate = milestone.getDueDate();
        issueResponses = toIssuesResponses(milestone.getIssues());
    }

    private List<DefaultIssueResponse> toIssuesResponses(List<Issue> issues) {
        return issues.stream()
                .map(DefaultIssueResponse::new)
                .collect(Collectors.toList());
    }
}
