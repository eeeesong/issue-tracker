package codesquad.issueTracker.domain;

import codesquad.issueTracker.oauth.dto.OauthUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "image_url")
    private String imageUrl;
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Issue> issues = new ArrayList<>();

    private User(String loginId, String imageUrl, String name) {
        this.loginId = loginId;
        this.imageUrl = imageUrl;
        this.name = name;
    }

    public static User fromGitHubUser(OauthUser oauthUser) {
        return new User(oauthUser.getLoginId(), oauthUser.getAvatarUrl(), oauthUser.getName());
    }
}
