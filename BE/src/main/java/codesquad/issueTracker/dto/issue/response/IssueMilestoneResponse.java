package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Milestone;
import lombok.Getter;

@Getter
public class IssueMilestoneResponse {
    private final Long id;
    private final String title;

    public IssueMilestoneResponse(Milestone milestone) {
        this.id = milestone.getId();
        this.title = milestone.getTitle();
    }
}
