defmodule Utils do
  def load_input(file) do
    {file_name, folder} = file |> Path.split() |> List.pop_at(-1)
    challenge = file_name |> String.split(".") |> List.first()

    folder
    |> Kernel.++(["inputs/#{challenge}.txt"])
    |> Path.join()
    |> File.read!()
    |> String.split("\n")
  end

  def execute(function, file, label) do
    input = load_input(file)

    fn -> function.(input) end
    |> :timer.tc()
    |> log_result(label)
  end

  defp log_result({time, result}, label) do
    IO.inspect(result, label: label)
    IO.puts("#{label} completed in #{time / 1_000}ms")
  end
end
