package codesquad.issueTracker.dto;

import codesquad.issueTracker.domain.Comment;
import codesquad.issueTracker.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentResponse {
    private Long id;
    private String description;

    @JsonProperty("created_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdDate;

    private UserResponse writer;

    public CommentResponse(Comment comment) {
        id = comment.getId();
        description = comment.getDescription();
        createdDate = comment.getCreatedDate();
        writer = toUserResponse(comment.getUser());
    }

    private UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(user);
    }
}
