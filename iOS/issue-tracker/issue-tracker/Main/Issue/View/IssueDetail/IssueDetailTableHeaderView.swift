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
    
    private lazy var issueStatusUIView: IssueStatusUIView = {
        let issueStatusUIView = IssueStatusUIView()
        return issueStatusUIView
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
        addIssueStatusUIView()
        addIssueCreatedInfoLabel()
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
    
    private func addIssueStatusUIView() {
        self.addSubview(issueStatusUIView)
        
        issueStatusUIView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            issueStatusUIView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            issueStatusUIView.topAnchor.constraint(equalTo: issueTitleTextLabel.bottomAnchor, constant: 16),
            issueStatusUIView.widthAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.widthAnchor, multiplier: 0.176),
            issueStatusUIView.heightAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.heightAnchor, multiplier: 0.26)
        ])
    }
    
    private func addIssueCreatedInfoLabel() {
        self.addSubview(issueCreatedInfoLabel)
        
        NSLayoutConstraint.activate([
            issueCreatedInfoLabel.leadingAnchor.constraint(equalTo: issueStatusUIView.trailingAnchor, constant: 8),
            issueCreatedInfoLabel.topAnchor.constraint(equalTo: issueTitleTextLabel.bottomAnchor, constant: 20)
        ])
    }
    
    func configure(title: String, issueNumber: Int, status: Bool, createdDate: String, aurthor: String) {
        issueTitleTextLabel.text = title
        issueTitleNumberLabel.text = "#"+String(issueNumber)
        issueStatusUIView.setStatus(status: status)
        issueCreatedInfoLabel.text = "\(calculateDateTime(createdDate: createdDate)) 전, \(aurthor)님이 작성했습니다."
    }
    
    private func calculateDateTime(createdDate: String) -> String {
                
        let dateFormatter = DateFormatter()
        dateFormatter.locale = Locale(identifier:"ko_KR")
        dateFormatter.dateFormat = "yyyy-MM-dd hh:mm"
        guard let startDate = dateFormatter.date(from: createdDate) else { return "방금"}
        let interval = Date() - startDate
        
        if interval.month! != 0 {
            return "\(interval.month!)달"
        } else if interval.day! != 0 {
            return "\(interval.day!)일"
        } else if interval.hour! != 0 {
            return "\(interval.hour!)시간"
        } else if interval.minute! != 0 {
            return "\(interval.minute!)분"
        } else {
            return "\(interval.second!)초"
        }
    }
}
