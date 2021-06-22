package codesquad.issueTracker.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean status;

    @Column(name = "created_date")
    @JsonProperty("created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    @JsonProperty("updated_date")
    private LocalDateTime updatedDate;
    private boolean deleted;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "milestone_id"))
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "user_id"))
    private User user;

    @OneToMany(mappedBy = "issue")
    private List<IssueHasLabel> issueLabels = new ArrayList<>();

    @OneToMany(mappedBy = "issue")
    private List<IssueAssignee> issueAssignees = new ArrayList<>();

    @OneToMany(mappedBy = "issue")
    private List<Comment> comments = new ArrayList<>();

    public Issue(String title, User writer, boolean open) {
        this.title = title;
        this.user = writer;
        this.status = open;
        this.createdDate = LocalDateTime.now();
        this.deleted = false;
    }

    public void delete() {
        this.deleted = true;
    }

    public void open() {
        if (status) {
            throw new IllegalStateException("닫힌 이슈가 아닙니다.");
        }
        this.status = true;
    }

    public void close() {
        if (!status) {
            throw new IllegalStateException("열린 이슈가 아닙니다.");
        }
        this.status = false;
    }

    public void editTitle(String title) {
        this.title = title;
    }

    public void editIssueAssignees(List<IssueAssignee> issueAssignees) {
        this.issueAssignees = issueAssignees;
    }

    public void editIssueLabels(List<IssueHasLabel> issueLabels) {
        this.issueLabels = issueLabels;
    }

    public void editMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public void addMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public void deleteMilestone() {
        milestone = null;
    }
}
