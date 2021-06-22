package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Milestone;
import lombok.Getter;

@Getter
public class IssueDetailMilestoneResponse {
    private final Long id;
    private final String title;
    private final Long totalIssueCount;
    private final Long openIssueCount;

    public IssueDetailMilestoneResponse(Milestone milestone, Long totalIssueCount, Long openIssueCount) {
        this.id = milestone.getId();
        this.title = milestone.getTitle();
        this.totalIssueCount = totalIssueCount;
        this.openIssueCount = openIssueCount;
    }

}
