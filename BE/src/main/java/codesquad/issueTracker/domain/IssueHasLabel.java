package codesquad.issueTracker.domain;

import codesquad.issueTracker.domain.compositeKey.IssueHasLabelId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@IdClass(IssueHasLabelId.class)
@Entity
@Getter @NoArgsConstructor @AllArgsConstructor
public class IssueHasLabel {

    @Id
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @Id
    @ManyToOne
    @JoinColumn(name = "label_id")
    private Label label;

}


