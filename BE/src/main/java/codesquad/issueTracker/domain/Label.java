package codesquad.issueTracker.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

import javax.persistence.*;


@Entity
@ToString
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

    public Label() {
    }

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

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColorCode() {
        return colorCode;
    }

    public String getContent() {
        return content;
    }
}
