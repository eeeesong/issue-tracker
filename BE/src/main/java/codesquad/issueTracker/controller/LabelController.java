package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.domain.Label;
import codesquad.issueTracker.service.LabelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labels")
public class LabelController {
    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public ApiResult<List<Label>> getLabels() {
        return ApiResult.success(labelService.findAll());
    }

    @PostMapping
    public ApiResult creatLabel(@RequestBody Label label) {
        labelService.creatLabel(label);
        return ApiResult.ok();
    }

    @PutMapping("/{labelId}")
    public ApiResult updateLabel(@PathVariable Long labelId, @RequestBody Label label) {
        labelService.updateLabel(labelId, label);
        return ApiResult.ok();
    }

    @DeleteMapping("/{labelId}")
    public ApiResult deleteLabel(@PathVariable Long labelId) {
        labelService.deleteLabel(labelId);
        return ApiResult.ok();
    }
}
