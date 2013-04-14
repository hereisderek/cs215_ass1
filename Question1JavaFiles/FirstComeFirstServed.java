import java.text.DecimalFormat;
import java.util.ArrayList;


public class FirstComeFirstServed extends AllocationStrategy {

	public FirstComeFirstServed(ArrayList<Job> jobs) {
		super(jobs);
	}

	@Override
	public void run() {
		int sysTime = 0;
		System.out.println("" +
				"============================================\n" +
				"Process ID | Turnaround time | Waiting time\n" +
				"============================================");
		for (int i = 0; i < Jobs.size(); i++){
			Jobs.get(i).start(sysTime);
			while (Jobs.get(i).getCPUTimeLeft() > 0){
				Jobs.get(i).tick(++sysTime);
			}
			//sysTime = Jobs.get(i).getCPUTime();
		}
		
		// calculate the average
		int sumTT = 0, sumWT = 0; 
		for (int i = 0; i < Jobs.size(); i++){
			sumTT += (Jobs.get(i).getEndTime() - Jobs.get(i).getSubmitTime());
			sumWT += (Jobs.get(i).getEndTime() - Jobs.get(i).getSubmitTime() - Jobs.get(i).getCPUTime());
		}
		double avgTT = (double)sumTT / Jobs.size();
		double avgWT = (double)sumWT / Jobs.size();
		DecimalFormat df = new DecimalFormat("#.##");
		String strAvgTT = df.format(avgTT);
		String strAvgWT = df.format(avgWT);
		
		System.out.println("============================================");
		System.out.println(("AVG.              ").substring(0,11)+"|" + 
				((strAvgTT+"                      ").substring(0,17)+"|" + 
				strAvgWT));
		System.out.println("============================================");
	}

}
