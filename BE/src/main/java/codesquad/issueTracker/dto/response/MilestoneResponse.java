package codesquad.issueTracker.dto.response;

import codesquad.issueTracker.domain.Milestone;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MilestoneResponse {

    private final Long id;
    private final String title;
    private final String description;

    @JsonProperty("due_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private final LocalDateTime dueDate;

    public MilestoneResponse(Milestone milestone) {
        id = milestone.getId();
        title = milestone.getTitle();
        description = milestone.getDescription();
        dueDate = milestone.getDueDate();
    }
}
