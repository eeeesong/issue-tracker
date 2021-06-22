package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Label;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class IssueLabelResponse {
    private final Long id;
    private final String name;

    @JsonProperty("color_code")
    private final String colorCode;

    public IssueLabelResponse(Label label) {
        id = label.getId();
        name = label.getName();
        colorCode = label.getColorCode();
    }
}
