//
//  IssueDetailLabelView.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import UIKit

final class IssueStatusUIView: UIView {
    
    var status: Bool?
    
    private lazy var labelTitle: UILabel = {
        let label = UILabel()    
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let spacing: CGFloat = 15
    
    private lazy var labelHeight: CGFloat = {
        return spacing * 2
    }()
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init(status: Bool) {
        super.init(frame: .zero)
        self.status = status
        configure()
    }
    
    private func configure() {
        layer.cornerRadius = labelHeight * 0.5
        translatesAutoresizingMaskIntoConstraints = false
        addLabelTitle()
    }
    
    func setStatus(status: Bool) {
        self.status = status
//        print("now status = ",self.status)
        
        guard let status = self.status else { return }
        
        backgroundColor = status == true ? Colors.openMileStoneBG : Colors.closeMileStoneBG
        
        let attributedString = NSMutableAttributedString(string: "")
        let imageAttachment = NSTextAttachment()
        let attrs = [NSAttributedString.Key.font : UIFont.boldSystemFont(ofSize: 13), NSAttributedString.Key.foregroundColor : status == true ? Colors.openMileStoneTint : Colors.closeMileStoneTint]
        let issueCountString = NSMutableAttributedString(string: status == true ? "열림" : "닫힘" , attributes:attrs)
        imageAttachment.image = UIImage(systemName: status == true ? "exclamationmark.circle" : "archivebox")
        attributedString.append(NSAttributedString(attachment: imageAttachment))
        attributedString.append(issueCountString)
        labelTitle.attributedText = attributedString
        
    }
    
    private func addLabelTitle() {
        addSubview(labelTitle)
        
        NSLayoutConstraint.activate([
            labelTitle.centerXAnchor.constraint(equalTo: centerXAnchor),
            labelTitle.centerYAnchor.constraint(equalTo: centerYAnchor),
            widthAnchor.constraint(equalTo: labelTitle.widthAnchor, constant: spacing * 1.5),
            heightAnchor.constraint(equalToConstant: labelHeight)
        ])
    }
}
