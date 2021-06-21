package codesquad.issueTracker.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "created_date")
    @JsonProperty("created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    @JsonProperty("updated_date")
    private LocalDateTime updatedDate;

    private boolean deleted;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "issue_id"))
    private Issue issue;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "user_id"))
    private User user;

    public Comment(String description, User writer) {
        this.description = description;
        this.user = writer;
        this.createdDate = LocalDateTime.now();
        this.deleted = false;
    }

    public void addIssue(Issue issue) {
        this.issue = issue;
    }
    
}
