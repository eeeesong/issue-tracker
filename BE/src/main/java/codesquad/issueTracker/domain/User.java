package codesquad.issueTracker.domain;

import codesquad.issueTracker.oauth.dto.OauthUser;

import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "image_url")
    private String imageUrl;
    private String name;


    public User() {

    }

    private User(String loginId, String imageUrl, String name) {
        this.loginId = loginId;
        this.imageUrl = imageUrl;
        this.name = name;
    }

    public static User of (String loginId, String avatarUrl, String name) {
        return new User(loginId, avatarUrl, name);
    }

    public static User fromGitHubUser(OauthUser oauthUser) {
        return new User(oauthUser.getLoginId(), oauthUser.getAvatarUrl(), oauthUser.getName());
    }

    public Long getId() {
        return id;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName() {
        return name;
    }
}
