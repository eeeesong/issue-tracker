//
//  IssueDetailViewController.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit

class IssueDetailViewController: UIViewController {
    
    private lazy var backToIssuesButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "chevron.backward", "목록")
        button.moveImageToLeft()
        button.addTarget(self, action: #selector(backToIssuesTouched), for: .touchUpInside)
        return button
    }()

    
    private var issueNumber: Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addNavigationItems()
        view.backgroundColor = UIColor.white
        print("안녕? 내 issuenumber는? =",self.issueNumber)
    }
    
    @objc func backToIssuesTouched(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
    
    func setIssuNumber(_ issueNumber: Int) {
        self.issueNumber = issueNumber
    }

    private func addNavigationItems() {
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backToIssuesButton)        
//        navigationItem.titleView = issues.get 통신의 issueTitle
    }
}

