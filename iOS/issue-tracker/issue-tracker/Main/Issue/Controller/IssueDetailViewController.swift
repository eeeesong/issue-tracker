//
//  IssueDetailViewController.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit

class IssueDetailViewController: UIViewController {
    
    private lazy var backButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "chevron.backward", "목록")
        button.addTarget(self, action: #selector(backToIssuesTouched), for: .touchUpInside)
        return button
    }()
    
//    private var saveOperation: ((Int) -> Void)? //
    private var issueNumber: Int?
//    issueNumber를 가져와서 여기서 load할듯.
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("안녕? 내 issuenumber는? =",self.issueNumber)
    }
    
    @objc func backToIssuesTouched(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
    
    func setIssuNumber(_ issueNumber: Int) {
        self.issueNumber = issueNumber
    }
//    func setSaveOperation(_ operation: @escaping (Int) -> Void) {
//        self.saveOperation = operation
//    }
}
