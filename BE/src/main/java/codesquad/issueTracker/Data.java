package codesquad.issueTracker;

import java.util.ArrayList;
import java.util.List;

public class Data {
    private List<?> data = new ArrayList<>();
    private String msg;

    public Data() {
    }

    private Data(List<?> data, String msg) {
        this.data = data;
        this.msg = msg;
    }

    public List<?> getData() {
        return data;
    }

    private void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public static Data ok(List<?> data, String dataType) {
        if(data.isEmpty()){
            String msg = "ERROR: [" + dataType + "] 의 데이터가 존재하지 않습니다.";
            return new Data(data, msg);
        }
        return new Data(data, null);
    }
}
