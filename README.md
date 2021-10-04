# issue tracker⚡️

깃허브 앱의 **issue tracking** 기능 클론 프로젝트

> [코드스쿼드](https://github.com/codesquad-members-2021/issue-tracker) 마스터즈 코스에서 진행한 프로젝트입니다.

- `개발 기간` 2021년 6월 7일 ~ 6월 25일
- `팀` iOS 2인 (with 백엔드 1인, 웹프론트엔드 2인) / + 코드 리뷰어 1인
- `협업 방식` github issues와 discussions을 통한 협의, 공유
- `주요 개발 키워드` MVC, Social Login(apple & github Auth), Code Based View, Alamofire

<br>


## 상세 개발 내용

### Social Login
- apple과 github 두 가지 방식의 소셜 로그인 기능을 구현했습니다.
- 두 로그인 방식뿐만 아니라 다른 소셜 로그인 방식이 추가되었을 때를 고려하여 확장 가능하도록 코드를 작성했습니다.
- 로그인 관리 객체의 타입을 추상화하여 의존성을 낮추고, 중복 코드를 줄였습니다. 
- LoginInfo 객체는 앱을 통틀어 같은 정보를 공유한다는 점을 고려하여 싱글톤으로 작성하였습니다.

```swift
// 로그인 관리 객체들의 공통 프로토콜 
protocol SocialLoginManagable {
    func login()
}

protocol SocialLoginManagerDelegate: AnyObject {
    func didSocialLoginSuccess(with loginInfo: LoginInfoDTO)
    func didSocialLoginFail(with error: LoginError)
}
```

```swift
// ViewController에서의 로그인 기능 구현
class LoginViewController: UIViewController {
    private var socialLoginManager: SocialLoginManagable? // AppleAuth & GithubAuth 객체가 공통으로 채택
    private let loginInfo = LoginInfo.shared

    @objc private func loginWithGithubTouched(_ sender: UIButton) {
        configureLoginManager(service: .github)
        socialLoginManager?.login()
    }
    
    @objc private func loginWithAppleTouched(_ sender: UIButton) {
        configureLoginManager(service: .apple)
        socialLoginManager?.login()
    }
    
    private func configureLoginManager(service: LoginService) {
        let keyChainManager = LoginKeyChainManager(loginService: service)
        loginInfo.service = service
        
        switch service {
        case .github:
            socialLoginManager = GithubAuthorizationManager(viewController: self, delegate: self, keyChainSaver: keyChainManager)
        case .apple:
            socialLoginManager = AppleAuthorizationManager(viewController: self, delegate: self, keyChainSaver: keyChainManager)
        }
    }
    // 이외의 코드 생략
}

extension LoginViewController: SocialLoginManagerDelegate {
    func didSocialLoginSuccess(with loginInfoDTO: LoginInfoDTO) {
        let loginInfo = LoginInfo.shared
        loginInfo.store(loginInfoDTO: loginInfoDTO)
        presentIssueViewController()
    }
    
    func didSocialLoginFail(with error: LoginError) {
        let errorText = error.description
        presentAlert(with: errorText)
    } 
}
```


<br>


## 화면 별 구현 내용

### 🔐 소셜로그인
- 깃허브 & 애플 로그인 구현
- 유저 로그인 정보 키체인 저장
- 로그인 실패 케이스 별 오류 메시지 표시

#### Github 로그인
<img src=https://user-images.githubusercontent.com/52390975/122518751-91f86880-d04c-11eb-917a-54d984abd848.gif width=320 align = left>
<img src=https://user-images.githubusercontent.com/52390975/122526241-0afbbe00-d055-11eb-9bd0-512f359a8c16.png width=320 align = center>

- 백엔드 연동하여 jwt 통신으로 API 통신 가능 로그인/로그아웃 가능


#### Apple 로그인
<img src=https://user-images.githubusercontent.com/72188416/122516705-0e3d7c80-d04a-11eb-811e-77a3c14c8353.gif width=320 align = left>
<img src=https://user-images.githubusercontent.com/72188416/122525396-26b29480-d054-11eb-8229-3142ba72780a.png width=320 align = center>

- 백엔드 연동 미구현으로 애플 로그인으로 서비스를 이용할 수는 없음

### 📄 이슈
- 이슈 조회 & 추가 & 삭제 & 이슈 코멘트

<img src= https://user-images.githubusercontent.com/52390975/123604660-03e36580-d836-11eb-9755-9c22941ac8d7.gif width=300 align = left> 
<img src= https://user-images.githubusercontent.com/52390975/123604402-c7176e80-d835-11eb-94ba-b6810b50122e.gif width=300 align = center> 

<img src= https://user-images.githubusercontent.com/52390975/123604592-f29a5900-d835-11eb-92fd-89726c6844e2.gif width=300 align = left> 
<img src= https://user-images.githubusercontent.com/52390975/123604507-db5b6b80-d835-11eb-8bf1-84232aa9899e.gif width=300 align = center> 



### 🏷 레이블
- 레이블 조회 및 추가 & 수정 & 삭제

<img src=https://user-images.githubusercontent.com/72188416/122516925-55c40880-d04a-11eb-9c3f-d348b221e320.gif width=240 align = left>
<img src=https://user-images.githubusercontent.com/72188416/122518322-04b51400-d04c-11eb-8144-3a2cef69c563.gif width=240 align = left>
<img src=https://user-images.githubusercontent.com/72188416/122516942-5a88bc80-d04a-11eb-951b-9cbfed5ab552.gif width=240 align = center>


### 🗿마일스톤

- 마일스톤 조회 및 추가 & 수정 & 삭제

<img src=https://user-images.githubusercontent.com/52390975/122677172-2664f580-d21c-11eb-8c4a-e02b287c6ac8.gif width=240 align = left>
<img src=https://user-images.githubusercontent.com/52390975/122677277-a4c19780-d21c-11eb-822c-09cb7081d892.gif width=240 align = left>
<img src=https://user-images.githubusercontent.com/52390975/122677195-38df2f00-d21c-11eb-9c29-c603063ee1b2.gif width=240 align = left>


