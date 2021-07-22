package codesquad.issueTracker.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@Getter
@NoArgsConstructor
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "color_code")
    @JsonProperty("color_code")
    private String colorCode;
    private String content;
    private boolean deleted;

    public Label(String name, String colorCode, String content) {
        this.name = name;
        this.colorCode = colorCode;
        this.content = content;
    }

    public void updateLabel(Label updateLabel) {
        this.name = updateLabel.getName();
        this.colorCode = updateLabel.getColorCode();
        this.content = updateLabel.getContent();
    }

    public void delete() {
        deleted = true;
    }
}
