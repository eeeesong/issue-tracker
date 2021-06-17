//
//  MileStoneTableViewCell.swift
//  issue-tracker
//
//  Created by jinseo park on 6/15/21.
//

import UIKit

class MileStoneTableViewCell: UITableViewCell {
    
    private let spacing: CGFloat = 16
//    
//    mileStoneStackView스택을 만들고
//    1 : sub스택
//       -1 Title 라벨
//       -2 몇 %인지 보이는 두개의 라벨
//    2 : 마일스톤에 대한 설명 라벨
//    3 : 데이트 라벨
//    4 : sub스택
//       -1 열린 이슈 라벨
//       -2 닫힌 이슈 라벨
    
    private lazy var mileStoneStackView: UIStackView = {
        let superStackView = UIStackView() //커다란 SuperStack
        superStackView.axis = .vertical
        superStackView.distribution = .fillProportionally
        superStackView.translatesAutoresizingMaskIntoConstraints = false
        superStackView.spacing = 1
        return superStackView
    }()
    
    private lazy var firstSubStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis = .horizontal
        stackView.distribution = .fill
        stackView.translatesAutoresizingMaskIntoConstraints = false
        return stackView
    }()
    
    private lazy var secondSubStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis = .horizontal
        stackView.distribution = .fillEqually
        stackView.translatesAutoresizingMaskIntoConstraints = false
        return stackView
    }()
    
    private lazy var titleLabel: UILabel = {
        let label = UILabel()
        label.text = "제목"
        label.font = UIFont.boldSystemFont(ofSize: 22)
        return label
    }()
    
    private lazy var completenessLabel: UILabel = {
        let label = UILabel()
        label.text = "100%"
        label.textColor = Colors.mileStoneSuceess
        label.font = UIFont.boldSystemFont(ofSize: 22)
        return label
    }()
    
    private lazy var descriptionLabel: UILabel = {
        let label = UILabel()
        label.textColor = Colors.description
        label.text = "마일스톤에 대한 설명(한 줄만 보여짐, 생략 가능)"
        label.font = .systemFont(ofSize: 17)
        return label
    }()
    
    private lazy var dateLabel: UILabel = {
        let label = UILabel()
        var dateText = "완료일(생략가능)"
        let attributedString = NSMutableAttributedString(string: "")
        let imageAttachment = NSTextAttachment()
        imageAttachment.image = UIImage(systemName: "calendar")

        let attrs = [NSAttributedString.Key.font : UIFont.boldSystemFont(ofSize: 18), NSAttributedString.Key.foregroundColor : Colors.description]
        let dateString = NSMutableAttributedString(string:dateText, attributes:attrs)
        
        attributedString.append(NSAttributedString(attachment: imageAttachment))
        attributedString.append(dateString)
        label.attributedText = attributedString
        return label
    }()
    
    private lazy var openMileStoneLabelView: MileStoneLabelView = {
        let mileStoneLabelView = MileStoneLabelView(chooseNum: 0) 
        return mileStoneLabelView
    }()
    
    private lazy var closedMileStoneLabelView: MileStoneLabelView = {
        let mileStoneLabelView = MileStoneLabelView(chooseNum: 1)

        return mileStoneLabelView
    }()
    
    static var reuseID: String {
        return String(describing: self)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setViews()
    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setViews()
    }
    
    private func setViews() {
        backgroundColor = Colors.mainGrape
        addMileStoneStackView()
    }
    
    private func addMileStoneStackView() {
        
        addSubview(mileStoneStackView)
        NSLayoutConstraint.activate([
            mileStoneStackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            mileStoneStackView.topAnchor.constraint(equalTo: topAnchor, constant: 24),
            mileStoneStackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -24),
            mileStoneStackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16)
        ])
        
        //MARK: 1 : sub스택
        //   -1 Title 라벨
        //   -2 몇 %인지 보이는 두개의 라벨
        
        //titleLabel, titleLabel 자체에 너비를 비율을 맞추어놓고 설정을 해주기.
        //firstSubStackView를 .fillProptionally로 바꾸어주기.
        mileStoneStackView.addArrangedSubview(firstSubStackView)
        
        NSLayoutConstraint.activate([
            firstSubStackView.leadingAnchor.constraint(equalTo: mileStoneStackView.leadingAnchor),
            firstSubStackView.trailingAnchor.constraint(equalTo: mileStoneStackView.trailingAnchor)
        ])
        
        firstSubStackView
            .addArrangedSubview(titleLabel)
        firstSubStackView
            .addArrangedSubview(completenessLabel)
        
        //MARK: 2 : 마일스톤에 대한 설명 라벨
        mileStoneStackView.addArrangedSubview(descriptionLabel)
        
        //MARK: 3 : 완료일 스택 or Label with Img
        mileStoneStackView.addArrangedSubview(dateLabel)
        
        //MARK: 4 : sub스택
        //-1 열린 이슈 라벨
        //-2 닫힌 이슈 라벨
        mileStoneStackView.addArrangedSubview(secondSubStackView)
        
        NSLayoutConstraint.activate([
            secondSubStackView.leadingAnchor.constraint(equalTo: mileStoneStackView.leadingAnchor),
            secondSubStackView.trailingAnchor.constraint(equalTo: mileStoneStackView.trailingAnchor)
        ])
        
        secondSubStackView
            .addArrangedSubview(openMileStoneLabelView)
        secondSubStackView
            .addArrangedSubview(closedMileStoneLabelView)
        
        NSLayoutConstraint.activate([
            openMileStoneLabelView.widthAnchor.constraint(equalTo: secondSubStackView.widthAnchor,constant: 1/2),
            
//            openMileStoneLabelView.leadingAnchor.constraint(equalTo: secondSubStackView.leadingAnchor),
//            
//            closedMileStoneLabelView.leadingAnchor.constraint(equalTo: openMileStoneLabelView.leadingAnchor),
            ])
    }
}