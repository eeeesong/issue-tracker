package codesquad.issueTracker.domain;

import codesquad.issueTracker.domain.compositeKey.IssueAssigneeId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@IdClass(IssueAssigneeId.class)
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IssueAssignee {

    @Id
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
