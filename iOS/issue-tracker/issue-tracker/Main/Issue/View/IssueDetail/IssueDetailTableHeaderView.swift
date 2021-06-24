//
//  IssueDetailTableHeaderView.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import UIKit

class IssueDetailTableHeaderView: UIView {
    
    private lazy var issueTitleTextLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.black
        label.font = UIFont.boldSystemFont(ofSize: 28.0)
        label.text = "테스트 이슈"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private lazy var issueTitleNumberLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.systemGray2
        label.font = UIFont.boldSystemFont(ofSize: 28.0)
        label.text = "#2"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private lazy var issueCreatedInfoLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.systemGray2        
        label.font = UIFont.boldSystemFont(ofSize: 17)
        label.text = "1분전"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setSubView()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setSubView()
    }
    
    private func setSubView() {
        addIssueTitleTextLabel()
        addIssueTitleNumberLabel()
    }
    
    private func addIssueTitleTextLabel() {
        self.addSubview(issueTitleTextLabel)
        
        NSLayoutConstraint.activate([
            issueTitleTextLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            issueTitleTextLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16)
        ])
    }
    
    private func addIssueTitleNumberLabel() {
        self.addSubview(issueTitleNumberLabel)
        
        NSLayoutConstraint.activate([
            issueTitleNumberLabel.leadingAnchor.constraint(equalTo: issueTitleTextLabel.trailingAnchor, constant: 8),
            issueTitleNumberLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16)
        ])
    }
    
    private func addIssueStatusUIView(_ status: Bool) {
        let issueStatusUIView = IssueStatusUIView(status: status)
        self.addSubview(issueStatusUIView)
        
        issueStatusUIView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            issueStatusUIView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            issueStatusUIView.topAnchor.constraint(equalTo: issueTitleTextLabel.bottomAnchor, constant: 16),
            issueStatusUIView.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.176),
            issueStatusUIView.heightAnchor.constraint(equalTo: heightAnchor, multiplier: 0.26)
        ])
    }
    
    private func addIssueCreatedInfoLabel(_ createTime: String, _ aurthor: String) {
        issueCreatedInfoLabel.text = "\(createTime) 전, \(aurthor)님이 작성했습니다."
        self.addSubview(issueCreatedInfoLabel)
        
        NSLayoutConstraint.activate([
            issueCreatedInfoLabel.leadingAnchor.constraint(equalTo: issueTitleTextLabel.trailingAnchor, constant: 8),
            issueCreatedInfoLabel.topAnchor.constraint(equalTo: issueTitleTextLabel.bottomAnchor, constant: 20)
        ])
    }
    
    func configure(title: String, issueNumber: Int, status: Bool, createTime: String, aurthor: String) {
        issueTitleTextLabel.text = title
        issueTitleNumberLabel.text = String(issueNumber)
        addIssueStatusUIView(status)
        addIssueCreatedInfoLabel(createTime, aurthor)
    }
}
