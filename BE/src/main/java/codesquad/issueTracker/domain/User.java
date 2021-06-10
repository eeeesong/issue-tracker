package codesquad.issueTracker.domain;

import codesquad.issueTracker.oauth.dto.OauthUser;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class User {

    @Id
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "image_url")
    private String imageUrl;
    private String name;
    private String password;


    public User() {

    }

    private User(Long id, String loginId, String imageUrl, String name, String password) {
        this.id = id;
        this.loginId = loginId;
        this.imageUrl = imageUrl;
        this.name = name;
        this.password = password;
    }

    public static User of (Long id, String loginId, String avatarUrl, String name, String password) {
        return new User(id, loginId, avatarUrl, name, password);
    }
}
