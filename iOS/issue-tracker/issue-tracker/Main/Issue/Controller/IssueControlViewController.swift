//
//  IssueControlViewController.swift
//  issue-tracker
//
//  Created by Song on 2021/06/21.
//

import UIKit
import Down

final class IssueControlViewController: UIViewController {

    private lazy var cancelButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "chevron.backward", "취소")
        button.moveImageToLeft()
        button.addTarget(self, action: #selector(cancelButtonTouched), for: .touchUpInside)
        return button
    }()
    
    private lazy var saveButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "plus", "저장")
        button.addTarget(self, action: #selector(saveButtonTouched), for: .touchUpInside)
        changeSaveButtonEnableStatus(baseOn: titleTextField)
        return button
    }()
    
    private enum Segment: Int, CaseIterable {
        case markdown = 0
        case preview = 1
        
        var title: String {
            switch self {
            case .markdown:
                return "마크다운"
            case .preview:
                return "미리보기"
            }
        }
    }
    
    private lazy var markdownSegmentedControl: UISegmentedControl = {
        let segmentedControl = UISegmentedControl()
        let segmentWidth = view.frame.width * 0.25
        
        Segment.allCases.forEach { segment in
            let segmentIndex = segment.rawValue
            segmentedControl.insertSegment(withTitle: segment.title, at: segmentIndex, animated: true)
            segmentedControl.setWidth(segmentWidth, forSegmentAt: segmentIndex)
        }

        let heavyFontStyle = UIFont.systemFont(ofSize: 14, weight: .heavy)
        let fontKey = NSAttributedString.Key.font
        segmentedControl.setTitleTextAttributes([fontKey: heavyFontStyle], for: .normal)
        segmentedControl.setTitleTextAttributes([fontKey: heavyFontStyle], for: .selected)
        
        segmentedControl.addTarget(self, action: #selector(markdownSegmentChanged), for: .valueChanged)
        segmentedControl.selectedSegmentIndex = Segment.markdown.rawValue
        return segmentedControl
    }()
    
    private lazy var titleInputView: UIView = {
        let container = UIView()
        container.translatesAutoresizingMaskIntoConstraints = false
        
        let titleLabel = UILabel()
        titleLabel.text = "제목"
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        
        container.addSubview(titleLabel)
    
        NSLayoutConstraint.activate([
            titleLabel.leadingAnchor.constraint(equalTo: container.safeAreaLayoutGuide.leadingAnchor, constant: spacing),
            titleLabel.centerYAnchor.constraint(equalTo: container.safeAreaLayoutGuide.centerYAnchor)
        ])
        
        container.addSubview(titleTextField)

        NSLayoutConstraint.activate([
            titleTextField.leadingAnchor.constraint(equalTo: container.safeAreaLayoutGuide.leadingAnchor, constant: spacing * 3),
            titleTextField.trailingAnchor.constraint(equalTo: container.safeAreaLayoutGuide.trailingAnchor, constant: -spacing),
            titleTextField.centerYAnchor.constraint(equalTo: container.safeAreaLayoutGuide.centerYAnchor)
        ])
        
        let line = CALayer()
        let borderWidth: CGFloat = 1
        let size = CGSize(width: view.frame.width - spacing, height: borderWidth)
        let origin = CGPoint(x: spacing, y: lineHeight - borderWidth)
        line.frame = CGRect(origin: origin, size: size)
        line.backgroundColor = Colors.border.cgColor
        container.layer.addSublayer(line)
        return container
    }()
    
    private lazy var titleTextField: UITextField = {
        let textField = UITextField()
        textField.placeholder = "(필수 입력)"
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.delegate = self
        return textField
    }()
    
    private lazy var markdownStackView: UIStackView = {
        let stackView = UIStackView(arrangedSubviews: [bodyTextView, markdownView])
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.translatesAutoresizingMaskIntoConstraints = false
        return stackView
    }()
    
    private lazy var bodyTextView: UITextView = {
        let textView = UITextView()
        textView.text = bodyPlaceholder
        textView.font = .systemFont(ofSize: 17)
        textView.textColor = .lightGray
        textView.dataDetectorTypes = UIDataDetectorTypes.all
        textView.translatesAutoresizingMaskIntoConstraints = false
        textView.delegate = self
        return textView
    }()
    
    private lazy var markdownView: DownView = {
        let downView = try! DownView(frame: .zero, markdownString: "")
        downView.pageZoom = 1.5
        downView.isHidden = true
        return downView
    }()
    
    private lazy var additionalInfoView: MultipleLineInputStackView = {
        let viewWidth = view.frame.width
        let stackViewFrame = CGRect(x: 0, y: 0, width: viewWidth, height: lineHeight * 3)
        let stackView = MultipleLineInputStackView(frame: stackViewFrame)
        
        let labelInfoItem = InputLineItem(category: "레이블", inputView: labelInfoControl)
        let milestoneInfoItem = InputLineItem(category: "마일스톤", inputView: milestoneInfoControl)
        let assigneeInfoItem = InputLineItem(category: "담당자", inputView: assigneeInfoControl)
        stackView.configure(with: [labelInfoItem, milestoneInfoItem, assigneeInfoItem])
        
        stackView.translatesAutoresizingMaskIntoConstraints = false
        return stackView
    }()
    
    private lazy var labelInfoControl: IssueInfoControl = {
        let infoControl = IssueInfoControl()
        infoControl.addTarget(self, action: #selector(labelInfoTouched), for: .touchUpInside)
        return infoControl
    }()
    
    private lazy var milestoneInfoControl: IssueInfoControl = {
        let infoControl = IssueInfoControl()
        infoControl.addTarget(self, action: #selector(milestoneInfoTouched), for: .touchUpInside)
        return infoControl
    }()
    
    private lazy var assigneeInfoControl: IssueInfoControl = {
        let infoControl = IssueInfoControl()
        infoControl.addTarget(self, action: #selector(assigneeInfoTouched), for: .touchUpInside)
        return infoControl
    }()

    private let bodyPlaceholder = "이곳에 내용을 입력하세요"
    
    private lazy var lineHeight: CGFloat = {
        return view.frame.height * 0.05
    }()
    
    private lazy var spacing: CGFloat = {
        return lineHeight * 0.5
    }()
    
    private var currentIssue: Issue?
    private var saveOperation: ((Issue) -> Void)?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureViews()
    }
    
    private func configureViews() {
        view.backgroundColor = .white
        navigationController?.navigationBar.prefersLargeTitles = false
        navigationItem.rightBarButtonItem?.isEnabled = saveButton.isEnabled
        
        addNavigationItems()
        addTitleInputView()
        addAdditionalInfoView()
        addBodyTextView()
    }

    private func addNavigationItems() {
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: cancelButton)
        navigationItem.rightBarButtonItem = UIBarButtonItem(customView: saveButton)
        navigationItem.titleView = markdownSegmentedControl
    }
    
    private func addTitleInputView() {
        view.addSubview(titleInputView)
        
        NSLayoutConstraint.activate([
            titleInputView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: spacing * 0.7),
            titleInputView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            titleInputView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            titleInputView.heightAnchor.constraint(equalToConstant: lineHeight)
        ])
    }
    
    private func addAdditionalInfoView() {
        view.addSubview(additionalInfoView)
        
        NSLayoutConstraint.activate([
            additionalInfoView.heightAnchor.constraint(equalToConstant: lineHeight * 3),
            additionalInfoView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            additionalInfoView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            additionalInfoView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
    
    private func addBodyTextView() {
        view.addSubview(markdownStackView)
        
        NSLayoutConstraint.activate([
            markdownStackView.topAnchor.constraint(equalTo: titleInputView.bottomAnchor, constant: spacing * 0.7),
            markdownStackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: spacing * 0.8),
            markdownStackView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -spacing * 0.8),
            markdownStackView.bottomAnchor.constraint(equalTo: additionalInfoView.topAnchor)
        ])
    }
    
    func setSaveOperation(_ operation: @escaping (Issue) -> Void) {
        self.saveOperation = operation
    }
    
    private func changeSaveButtonEnableStatus(to status: Bool) {
        saveButton.isEnabled = status
    }
    
    @objc private func cancelButtonTouched(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }
    
    @objc private func saveButtonTouched(_ sender: UIButton) {
        guard let saveOperation = saveOperation else { return }
        let tempIssue = Issue()
        saveOperation(tempIssue)
    }
    
    @objc private func markdownSegmentChanged(_ sender: UISegmentedControl) {
        let currentIndex = sender.selectedSegmentIndex
    
        switch currentIndex {
        case Segment.markdown.rawValue:
            previewToMarkDown()
        case Segment.preview.rawValue:
            markdownToPreview()
        default:
            assert(false)
        }
    }
    
    private func previewToMarkDown() {
        markdownView.isHidden = true
        bodyTextView.isHidden = false
    }
    
    private func markdownToPreview() {
        guard let rawText = bodyTextView.text else { return }
        try? markdownView.update(markdownString: rawText)
        markdownView.isHidden = false
        bodyTextView.isHidden = true
    }
    
    @objc private func labelInfoTouched(_ sender: UIButton) {
        print("레이블 내놔!")
    }
    
    @objc private func milestoneInfoTouched(_ sender: UIButton) {
        print("마일스톤 내놔!")
    }
    
    @objc private func assigneeInfoTouched(_ sender: UIButton) {
        print("담당자 내놔!")
    }
}

extension IssueControlViewController: UITextFieldDelegate {
    func textFieldDidChangeSelection(_ textField: UITextField) {
        changeSaveButtonEnableStatus(baseOn: textField)
    }
    
    private func changeSaveButtonEnableStatus(baseOn textField: UITextField) {
        DispatchQueue.main.async {
            self.saveButton.isEnabled = !textField.isEmpty()
        }
    }
}

extension IssueControlViewController: UITextViewDelegate {
    func textViewDidBeginEditing(_ textView: UITextView) {
        if textView.textColor == .lightGray {
            textView.textColor = .black
            textView.text = nil
        }
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        if textView.text.isEmpty {
            textView.textColor = .lightGray
            textView.text = bodyPlaceholder
            changeSaveButtonEnableStatus(to: false)
        }
    }
}